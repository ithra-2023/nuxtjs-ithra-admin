import { Timestamp } from 'firebase/firestore';

export const formatDate = (timestamp: Timestamp) => {
	const date: Date = new Date(timestamp.seconds * 1000);

	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		calendar: 'gregory',
	};
	return new Intl.DateTimeFormat('ar-SA', options).format(date);
};


// formats date to m/d/yyyy
export const formatDateToEdit = (timestamp: Timestamp) => {
    console.log(timestamp);
    const date: Date = new Date(timestamp.seconds * 1000);
    // return the date formatted as m/d/yyyy
    console.log(date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    
}

export function formatDistance(distanceInMeters: number): string {
	const distanceInKilos = distanceInMeters / 1000;
	return `${distanceInKilos.toFixed(2)} كم`;
}

// takes time as a string in this format "17:30" and returns "5:30 pm"
export const formatTime = (time: string) => {
	const [hour, minute] = time.split(':');
	const date = new Date();
	date.setHours(parseInt(hour));
	date.setMinutes(parseInt(minute));
	const options: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};
	return new Intl.DateTimeFormat('ar-SA', options).format(date);
};
