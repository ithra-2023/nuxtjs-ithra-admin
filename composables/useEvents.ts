import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import type { IGetEvents } from '@/types';

export const getEvents = async (): Promise<IGetEvents> => {
	const { firestore } = useFirestore();

	const error = null;
	let events: IEvent[] = [];

	try {
		const eventsCollectionRef = collection(firestore, 'events');
		const eventsCollectionSnapshot = await getDocs(eventsCollectionRef);

		events = eventsCollectionSnapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			} as IEvent;
		});
	} catch (error: any) {
		error.value = error;
		console.error('useEvents.ts', 'Error fetching events:', error);
	}

	return {
		events,
		error,
	};
};

export const reviewEvent = async (eventId: string, userId:string,  rating: number, review: string): Promise<void> => {
    const { firestore } = useFirestore();

    try {
        const eventRef = doc(firestore, 'events', eventId);

        const ratingObject = {
            rating: rating,
            review: review,
        }

        console.log(ratingObject);
        
        await updateDoc(eventRef, {
            [`reviews.${userId}`]: ratingObject
        });

    } catch (error: any) {
        console.error('useEvents.ts', 'Error rating event:', error);
    }
}

export const getAverageReviews = (reviews: IReview[]) => {
    const reviewsArray: IReview[] = Object.values(reviews || {}) as IReview[];
    console.log('event/id.vue', 'Number of reviews:', reviewsArray.length); // Debugging line

    let average = 0;

    if (reviewsArray.length > 0) {
        average = reviewsArray.reduce((a: any, b: IReview) => a + (b.rating || 0), 0) / reviewsArray.length;
    } else {
        average = 0;
    }

    // If there's only one review
    if (reviewsArray.length === 1) {
        average = reviewsArray[0].rating;
    }
    console.log('useEvents.ts', 'average_reviews', average);
    return average;
};

export const getTopReviewsComments = (reviews: IReview[], count: number) => {
    const reviewsArray: IReview[] = Object.values(reviews || {}) as IReview[];

    let topReviews: IReview[] = [];

    if (reviewsArray.length > 0) {
        topReviews = reviewsArray.sort((a: any, b: IReview) => b.rating - a.rating).slice(0, count);
    } else {
        topReviews = [];
    }

    // If there's only one review
    if (reviewsArray.length === 1) {
        topReviews = reviewsArray;
    }
    console.log('useEvents.ts', 'topReviews', topReviews);
    return topReviews;
};

export const useDeleteEvent = async (id: string): Promise<boolean> => {
    const { firestore } = useFirestore();

    try {
        console.log('useFirestore.ts', 'Deleting event:', id);
        const eventRef = doc(firestore, 'events', id);
        await deleteDoc(eventRef);
        return true;
    } catch (error: any) {
        console.error('useFirestore.ts', 'Error deleting event:', error);
        return false;
    }
}

export const updateEventInFirestore = async (event: IEvent, id?: string, ): Promise<boolean> => {
    const { firestore } = useFirestore();

    try {
        if(id && id !== '') {
            const eventRef = doc(firestore, 'events', id);
            await setDoc(eventRef, event, { merge: true });  // Use setDoc with merge option
            console.log(`Event with ID ${id} updated or created successfully in Firestore.`);
        }
        else{
            const eventsCollectionRef = collection(firestore, 'events');
            const docRef = await addDoc(eventsCollectionRef, event);  // Use addDoc to add a new document
            console.log(`New event created with ID ${docRef.id} in Firestore.`);
        }
        return true;
        
    } catch (error: any) {
        console.error(`Error updating or creating event: `, error);
        return false;
    }
};
