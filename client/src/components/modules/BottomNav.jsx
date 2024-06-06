import { Outlet, Link, useLocation } from 'react-router-dom';
import homeIcon from '@/assets/icons/home.svg';
import listChecksIcon from '@/assets/icons/list-checks.svg';
import baggageClaimIcon from '@/assets/icons/baggage-claim.svg';
import ticketIcon from '@/assets/icons/ticket.svg';
import settingsIcon from '@/assets/icons/settings.svg';

import homeIconColored from '@/assets/icons/home-colored.svg';
import listChecksIconColored from '@/assets/icons/list-checks-colored.svg';
import baggageClaimIconColored from '@/assets/icons/baggage-claim-colored.svg';
import ticketIconColored from '@/assets/icons/ticket-colored.svg';
import settingsIconColored from '@/assets/icons/settings-colored.svg';

function BottomNav() {
    const location = useLocation();
    const isActive = (path) => (location.pathname === path ? 'bg-brand-300/10 rounded-3xl' : '');

    return (
        <div className="flex flex-col items-center justify-between min-h-screen ">
            <div className="mx-4 overflow-x-hidden overflow-y-auto h-[calc(100vh-96px)]">
                <Outlet />
            </div>
            <footer className="fixed bottom-0 flex items-center justify-center w-full bg-white border-black shadow-inner shadow-brand-400/10 min-h-24">
                <div className="flex flex-row items-center w-full justify-evenly">
                    <Link to="/main">
                        <img
                            className={`p-3 ${isActive('/main')}`}
                            src={location.pathname === '/main' ? homeIconColored : homeIcon}
                            alt="홈 아이콘"
                        />
                    </Link>
                    <Link to={`/checklist/${localStorage.getItem('selectedJourneyId')}`}>
                        <img
                            className={`p-3 ${isActive(`/checklist/${localStorage.getItem('selectedJourneyId')}`)}`}
                            src={
                                location.pathname === `/checklist/${localStorage.getItem('selectedJourneyId')}`
                                    ? listChecksIconColored
                                    : listChecksIcon
                            }
                            alt="점검 리스트 아이콘"
                        />
                    </Link>
                    <Link to="/checkincounterinfo">
                        <img
                            className={`p-3 ${isActive('/checkincounterinfo')}`}
                            src={
                                location.pathname === '/checkincounterinfo' ? baggageClaimIconColored : baggageClaimIcon
                            }
                            alt="수하물 아이콘"
                        />
                    </Link>
                    <Link to="/flightticketinfo">
                        <img
                            className={`p-3 ${isActive('/flightticketinfo')}`}
                            src={location.pathname === '/flightticketinfo' ? ticketIconColored : ticketIcon}
                            alt="항공권 아이콘"
                        />
                    </Link>
                    <Link to="/settings">
                        <img
                            className={`p-3 ${isActive('/settings')}`}
                            src={location.pathname === '/settings' ? settingsIconColored : settingsIcon}
                            alt="설정 아이콘"
                        />
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default BottomNav;
