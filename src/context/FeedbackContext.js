import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from context',
            rating: 10
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    };

    // Delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete this feedback ?')) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    // Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item)))
        console.log(feedback);
    }

    // Set item to be updated
    const editFeedback = (item) => {
        console.log(item.id);
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext