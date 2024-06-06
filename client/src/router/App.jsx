import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Test from '../Test.jsx';

import BottomNav from '@/components/modules/BottomNav';
import Login from '@/pages/Login.jsx';
import ErrorPage from '@/pages/ErrorPage.jsx';
import JourneyCollectionPage from '@/pages/JourneyCollectionPage.jsx';
import CheckListPage from '@/pages/CheckListPage.jsx';
import CheckInCounterInfoPage from '@/pages/CheckInCounterInfoPage.jsx';
import FlightTicketInfoPage from '@/pages/FlightTicketInfoPage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';
import BaggageInfoPage from '@/pages/BagaggeInfoPage';
import ExchangeInfoPage from '@/pages/ExchangeInfoPage';
import PassportInfoPage from '@/pages/PassportInfoPage';
import RoamingInfoPage from '@/pages/RoamingInfoPage';
import TerminalTransportInfoPage from '@/pages/TerminalTransportInfoPage';

const App = () => {
    const user = useSelector((state) => state.auth.user);

    const router = createBrowserRouter([
        {
            path: '/',
            element: user ? <Navigate to="/main" /> : <Navigate to="/login" />,
        },
        {
            path: '/test',
            element: <Test />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/',
            element: <BottomNav />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/main',
                    element: <JourneyCollectionPage />,
                },
                {
                    path: '/checklist/:journeyId',
                    element: <CheckListPage />,
                },
                {
                    path: '/checkincounterinfo',
                    element: <CheckInCounterInfoPage />,
                },
                {
                    path: '/flightticketinfo',
                    element: <FlightTicketInfoPage />,
                },
                {
                    path: '/settings',
                    element: <SettingsPage />,
                },
                {
                    path: '/info/exchange',
                    element: <ExchangeInfoPage />,
                },
                {
                    path: '/info/passport',
                    element: <PassportInfoPage />,
                },
                {
                    path: '/info/roaming',
                    element: <RoamingInfoPage />,
                },
                {
                    path: '/info/baggage',
                    element: <BaggageInfoPage />,
                },
                {
                    path: '/info/terminaltransport',
                    element: <TerminalTransportInfoPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
