import React, {useState, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
const axios = require('axios');
export default function ForgotPasswordComp() {

    const navigate = useNavigate();
    const [preloader, setPreloader] = useState(false);
    const inputPnumber = useRef()
    var preLoaderStyle = {
        display: "flex"
    };
    function registerHandle(e) {
        e.preventDefault();
        var cleanNumber = inputPnumber.current.value.replace(/[^\w\s]/gi, '').replace(/_/g, '');
        if(cleanNumber.length === 12) {
            setPreloader(true)
            axios({
                method: 'post',
                baseURL: 'https://otpservice.digimall.az/api/Sms/SendSms',
                headers: {
                    'Content-Type' : 'application/json',
                    'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
                },
                data: {
                    phoneNumber: cleanNumber,
                }
            }).then(function (response) {
                setPreloader(false)
                if(response.data.isSent) {
                    localStorage.setItem('PasswordResetNumber', cleanNumber);
                    navigate("/otp");
                }
            });
        }
    };
    return(
        <>
        {preloader ?
            <div id="preloader" style={preLoaderStyle} className="sc-AykKC ceHfpt">
                <div className="sc-AykKH gNkidG"><span></span></div><div className="preloader-text">OTP göndərilir...</div>
            </div>
            :
            <></>
        }
            <div className="forgot-passwd-sec wf-section">
                <div className="dv-wrapper">
                    <div className="forgot-passwd-wrapper">
                        <div id="w-node-e5feec52-ba8b-d382-fd3c-2f24213f0398-ac02384d" className="forgot-passwd-main">
                            <div className="forgot-div">
                                <h3 className="login-heading">Şifrəni unutmusunuz?</h3>
                                <div className="text-block-13">E-poçtunuzu daxil edin və sizə parol sıfırlama linki göndərək.</div>
                                <div className="form-block w-form">
                                    <form id="email-form-2" name="email-form-2" className="login-form-cont" onSubmit={registerHandle}>
                                        <InputMask className="reset-pass w-input" placeholder="Telefon nömrəsi" mask="+\9\94-99-999-99-99" ref={inputPnumber} required />
                                        <input type="submit" value="ŞİFRƏNİ YENİLƏYİN" className="forgot-passwd-button forgot-passwd-button-active w-button" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}