import { Timestamp } from 'firebase/firestore';
import * as XLSX from 'xlsx';

export const convertToDate = (dateString: string): Timestamp =>{    
    const [month, day, year] = dateString.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return Timestamp.fromDate(dateObj);
}

export const useExcel = () => {

    //should export two functions, downloadExcel, and uploadExcel
    const downloadExcel = async (events: IEvent[]) => {
        const aoa = events.map((event: IEvent) => [
            event.id,
            event.entity,
            event.title,
            event.category,
            event.description,
            event.city,
            (event.language as string[])?.join(','),
            event.area,
            event.ll,
            //convert to string of type MM/DD/YYY
            event.start_date.seconds ? new Date(event.start_date.seconds * 1000).toLocaleDateString() : '',
            event.end_date.seconds ? new Date(event.end_date.seconds * 1000).toLocaleDateString() : '',
            event.start_time,
            event.end_time,
        ]);

        aoa.unshift(["id", "entity", "title", "category", "description", "city", "language", "area", "ll", "start_date", "end_date", "start_time", "end_time"]);

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(aoa);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
        XLSX.writeFile(workbook, "Events.xlsx");
    }
    
    const uploadExcel = async (file: any) => { 
        console.log('uploadExcel', file)  
        const data = await file.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data);

        // Get the first sheet
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];

        // Define required headers
        const requiredHeaders = ['title'];

        // Automatically get properties from IEvent type
        const dummyEvent: IEvent = {
            id: '',
            title: '',
            description: '',
            entity: '',
            category: '',
            start_date: Timestamp.fromDate(new Date()),
            end_date: Timestamp.fromDate(new Date()),
            start_time: '',
            end_time: '',
            language: [],
            reviews: [],
            distance: 0,
            city: '',
            area: '',
            ll: ''
        };
        
        const expectedHeaders = Object.keys(dummyEvent);

        
        // Validate headers
        const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];

        if (!headers.every(header => expectedHeaders.includes(header))) {
            console.log("Headers do not match expected headers.");
            return;
        }

        // Check if required headers are present
        if (!requiredHeaders.every(header => headers.includes(header))) {
            console.log(`Required headers are missing from the Excel sheet.`);
            return;
        }

        try {


            // Read data into IEvent array
            const events: IEvent[] = XLSX.utils.sheet_to_json(worksheet) as IEvent[];

            console.log(events);

            // update the first event only in the stores/event.ts store using the updateEvent(id, event) method
            const { addEvent, updateEvent } = useEventsStore();

            // loop through all and apply the same logic
            for(const item of events) {
                console.log(item)
                console.log('stores/events.ts', '📪 Updating event in firebase and store', item.id);
                const event_id = item.id as string;
                item.start_date = convertToDate(item.start_date.toString());
                item.end_date = convertToDate(item.end_date.toString());
                item.language = (item.language as string).split(',');
                delete item.id;
                console.log('before awaiting')
                
                if(event_id !== '') await updateEvent(item, event_id);
                else await addEvent(item);

                console.log('stores/events.ts', event_id, '📪 Event updated in firebase and store');
            };


        } catch (error) {
            console.error('stores/events.ts', '📪 Error updating event in firebase and store', error);
        }
    }

    return {
        downloadExcel,
        uploadExcel
    }
}
