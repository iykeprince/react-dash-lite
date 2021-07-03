import { useEffect } from "react"
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const AuthLayout = ({children}) => {
    useEffect(() => {
        document.body.className = '';
        document.body.className = 'nk-body npc-crypto ui-clean pg-auth';
    });
    return (
        <div className="nk-app-root">

            <div className="nk-split nk-split-page nk-split-md">
                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container">
                    <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                        <a href="#" className="toggle btn-white btn btn-icon btn-light" data-target="athPromo"><em className="icon ni ni-info"></em></a>
                    </div>
                    <div className="nk-block nk-block-middle nk-auth-body">
                        {children}
                    </div>
                    <div className="nk-block nk-auth-footer">
                        <div className="nk-block-between">
                            <ul className="nav nav-sm">
                                <li className="nav-item">
                                    <a className="nav-link" href="https://bitfetter.com/terms-use.html">Terms of use</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://bitfetter.com/privacy.html">Privacy Policy</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Help</a>
                                </li>
                                <li className="nav-item dropup">
                                    <a className="dropdown-toggle dropdown-indicator has-indicator nav-link" data-toggle="dropdown" data-offset="0,10"><small>English</small></a>
                                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                        <ul className="language-list">
                                            <li>
                                                <a href="#" className="language-item">
                                                    <img src="./images/flags/english.png" alt="" className="language-flag" />
                                                    <span className="language-name">English</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="language-item">
                                                    <img src="./images/flags/spanish.png" alt="" className="language-flag" />
                                                    <span className="language-name">Español</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="language-item">
                                                    <img src="./images/flags/french.png" alt="" className="language-flag" />
                                                    <span className="language-name">Français</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="language-item">
                                                    <img src="./images/flags/turkey.png" alt="" className="language-flag" />
                                                    <span className="language-name">Türkçe</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-3">
                            <p>&copy; 2021 BitFetter. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
                <div className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right" data-content="athPromo" data-toggle-screen="lg" data-toggle-overlay="true">
                    <div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
                        <div className="slider-init" data-slick='{"dots":true, "arrows":false}'>
                            <Slider {...settings}>
                                <div className="slider-item">
                                    <div className="nk-feature nk-feature-center">
                                        <div className="nk-feature-img">
                                            <img className="round" src="./assets/logos/favicon_blue@4x.png" tabIndex="./images/slides/promo-a2x.png 2x" alt="" />
                                        </div>
                                        <div className="nk-feature-content py-4 p-sm-5">
                                            <h1>Bitfetter</h1>
                                        </div>
                                    </div>
                                </div>
                                
                            </Slider>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout