import { Routes, Route, Link } from 'react-router';
import FeedbackForm from '../pages/feedbackForm';
import FeedbackList from '../pages/feedbackList';
import Header from '../pages/header';

// Layout
const Router = () => {
    return (
        <div>
            <Header />
            <Routes >
                <Route path="/" element={<FeedbackForm />} />
                <Route path="/feedbacks" element={<FeedbackList />} />
            </Routes>
        </div>
    );
};

export default Router;
