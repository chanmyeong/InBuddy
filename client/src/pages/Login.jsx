import InBuddyLogoImg from '@/assets/InBuddy-logo.svg';
import cloudImg from '@/assets/cloud-img.svg';
import naverLoginBtnImg from '@/assets/naver-login-btn.svg';
import kakaoLoginBtnImg from '@/assets/kakao-login-btn.svg';
// import chevronsDownIcon from '@/assets/icons/chevrons-down.svg';

const { VITE_BASE_URL } = import.meta.env;

function Login() {
    // const [email, setEmail] = useState('');

    return (
        <div className="flex flex-col mx-auto my-auto h-[100vh]">
            <div className="relative h-[100vh]">
                <img
                    className="absolute w-80 top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 mx-auto "
                    src={cloudImg}
                    alt="구름 이미지"
                />
                <img
                    className="absolute w-80 top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 mx-auto "
                    src={InBuddyLogoImg}
                    alt="브랜드 로고"
                />

                <div className="absolute top-[80%] left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col space-y-4 ">
                    <img
                        className="inset-0 z-10 mx-auto w-100"
                        src={naverLoginBtnImg}
                        alt="네이버 로고 버튼"
                        onClick={() =>
                            (window.location.href = `${VITE_BASE_URL}/api/oauth2/authorization/naver?redirect_uri=/main&mode=login`)
                        }
                    />
                    <img
                        className="inset-0 z-10 mx-auto w-100"
                        src={kakaoLoginBtnImg}
                        alt="카카오 로고 버튼"
                        onClick={() =>
                            (window.location.href = `${VITE_BASE_URL}/api/oauth2/authorization/kakao?redirect_uri=/main&mode=login`)
                        }
                    />
                    {/* <img className="inset-0 z-10 w-12 mx-auto" src={chevronsDownIcon} alt="아래 스크롤 아이콘" /> */}
                </div>
            </div>
            {/* <div className="h-[100vh]">아래 스크린</div> */}
        </div>
    );
}

export default Login;
