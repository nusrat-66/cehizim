import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logOutBtn from "../../../src/assets/images/log-out.svg";
import userIcon from "../../../src/assets/images/user.svg";
import boxIcon from "../../../src/assets/images/box.svg";
import notificationIcon from "../../../src/assets/images/notification.svg";
import CloseNotificationIcon from "../../../src/assets/images/cross.svg";
import axios from "axios";
import NotificationIcon from "../../assets/images/notification.svg";
import CityField from "../citydata.json";
import { useDispatch } from "react-redux";
import { login, unLog } from "../../redux/actions";
import ChangePassword from "./changePassword";
import agent from "../../api/agent";
import { useSelector } from "react-redux";
import UnvanFormProfile from "./unvanFormProfile";
var decode = require('decode-html');

const ProfileComp = () => {
  var preLoaderStyle = {
    display: "flex",
  };
  const [preloader, setPreloader] = useState(true);
  const [tab, setTab] = useState("my-account");
  const [orderTab, setOrderTab] = useState("all");
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [userLogin, setuserLogin] = useState();
  const [unvanlar, setUnvanlar] = useState([]);
  const [sifarisler, setSifarisler] = useState(false);
  const { customerId } = useSelector((state) => state.loginReducer);
  const [Noti, setNoti] = useState();
  useEffect(async () => {
    if (customerId) {
      const userNotifications = await agent.UserNotifications.listAll(customerId);
      setNoti(userNotifications);
      const unvanlarApi =
        await agent.BucketRelated.getCustomerAddressForCehizim(customerId);
      setUnvanlar(unvanlarApi);
      const sifarislerApi = await agent.BucketRelated.getCustomerProducts(
        customerId
      );
      if (sifarislerApi.length !== 0) {
        setSifarisler(sifarislerApi);
      }
    }
  }, [customerId]);
  const navigate = useNavigate();
  const listCityItems = CityField.map((option) => (
    <option key={option.field} value={option.field}>
      {option.field}
    </option>
  ));
  const dispatch = useDispatch();
  useEffect(() => {
    let loginDatas = null;
    var local_token = localStorage.getItem("token");
    if (local_token !== null) {
      var token = jwt_decode(localStorage.getItem("token"));
      axios({
        method: "get",
        baseURL: `https://apis.digimall.az/api/Customers/GetCustomerByIdentityUserId/${token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "api-key": "620C471E-05CC-4D90-9817-B7A3EED57E1B",
        },
      })
        .then((response) => {
          loginDatas = {
            name: `${response.data.name}`,
            surName: `${response.data.family}`,
            phoneNumber: response.data.cellPhone,
            id: response.data.userId,
          };
          return axios({
            method: "get",
            baseURL: `https://apis.digimall.az/api/Customers/GetCustomerByIdentityUserId/${response.data.userId}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "api-key": "620C471E-05CC-4D90-9817-B7A3EED57E1B",
            },
          });
        })
        .then(function (data) {
          dispatch(
            login({
              id: loginDatas.id,
              phoneNumber: loginDatas.phoneNumber,
              customerId: data.data.id,
              fullname: `${loginDatas.name} ${loginDatas.surName}`,
            })
          );

          setPhonenumber(`+${loginDatas.phoneNumber}`);
          setName(loginDatas.name);
          setSurname(loginDatas.surName);
          setuserLogin("logged");
          setPreloader(false);
        });
    } else {
      setPreloader(false);
    }
  }, []);
  function ProfilePagesBtn(e) {
    setTab(e.currentTarget.dataset.wTab);
  }
  function LogOut(event) {
    dispatch(unLog());
    localStorage.removeItem("token");
    navigate("/");
  }
  const deleteUnvan = async (addressId, index) => {
    const deleteResponse = await agent.BucketRelated.updateAdressStatus({
      addressId,
      recordStatus: 2,
    });
    if (deleteResponse.Message.includes("successfully")) {
      let mockArr = unvanlar;
      mockArr.splice(index, 1);
      setUnvanlar([...mockArr]);
    }
  };

    function removeNotification(key, id) {
      setNoti(Noti.filter(item => item.id !== id))
    }
    function readNotification(id, event) {
      var tmp__ = Noti.findIndex(item => item.id === id);
      event.currentTarget.className = "notifi-list-item-read"
      agent.UserNotifications.read(Noti[tmp__]["id"]);
    }
  return (
    <div className="profile-sec wf-section">
      {preloader ? (
        <div id="preloader" style={preLoaderStyle} className="sc-AykKC ceHfpt">
          <div className="sc-AykKH gNkidG">
            <span></span>
          </div>
          <div className="preloader-text">Yüklənir...</div>
        </div>
      ) : (
        <></>
      )}
      <div
        className={
          userLogin === "logged" ? "disabled-element-cs" : "user-message-cs"
        }
      >
        Bu səhifəni görüntüləmək üçün hesabınıza daxil olun
      </div>
      <div
        className={
          userLogin === "logged" ? "dv-wrapper" : "disabled-element-cs"
        }
      >
        <div
          id="w-node-a9b95682-783d-7577-ca8a-49b467ea591e-06695e49"
          data-current="my-account"
          data-easing="ease"
          data-duration-in={300}
          data-duration-out={100}
          className="profile-tabs w-tabs"
        >
          <div
            id="w-node-a9b95682-783d-7577-ca8a-49b467ea591f-06695e49"
            className="profile-menu w-tab-menu"
          >
            <a
              data-w-tab="my-account"
              className={
                tab === "my-account"
                  ? "my-account gap-b-4 w-inline-block w-tab-link w--current"
                  : "my-account gap-b-4 w-inline-block w-tab-link"
              }
              onClick={ProfilePagesBtn}
            >
              <div className="icon-prof-dis gap-r-12" data-w-tab="my-account">
                <img
                  src={userIcon}
                  loading="lazy"
                  alt=""
                  className="accn-icon wh-24"
                />
              </div>
              <div className="accn-text">Mənim hesabım</div>
            </a>
            <a
              data-w-tab="my-orders"
              className={
                tab === "my-orders"
                  ? "my-orders pag-b-4 w-inline-block w-tab-link w--current"
                  : "my-orders pag-b-4 w-inline-block w-tab-link"
              }
              onClick={ProfilePagesBtn}
            >
              <div className="icon-box-dis gap-r-12">
                <img src={boxIcon} className="accn-icon wh-24" />
              </div>
              <div>Sifarişlərim</div>
            </a>
            <a
              data-w-tab="notifi"
              className={
                tab === "notifi"
                  ? "notifi gap-b-4 w-inline-block w-tab-link w--current"
                  : "notifi gap-b-4 w-inline-block w-tab-link"
              }
              onClick={ProfilePagesBtn}
            >
              <div className="icon-notifi-dis gap-r-12">
                <img src={notificationIcon} className="accn-icon wh-24" />
              </div>
              <div>Bildirişlərim</div>
            </a>
            <a className="log-out-btn w-button" onClick={LogOut}>
              <img src={logOutBtn} /> Hesabdan çıx{" "}
            </a>
          </div>
          <div className="profile-block w-tab-content">
            <div
              data-w-tab="my-account"
              className={
                tab === "my-account"
                  ? "w--tab-active"
                  : "my-account-content w-tab-pane"
              }
            >
              <div className="profile-details">
                <div className="block-header">
                  <h4 className="checkout-heading">Mənim hesabım</h4>
                </div>
                <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                  <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                        Telefon
                      </label>
                      <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                        {phonenumber}
                      </label>
                    </div>
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                        Ad
                      </label>
                      <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                        {name}
                      </label>
                    </div>
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                        Soyad
                      </label>
                      <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                        {surname}
                      </label>
                    </div>
                  </div>
                  <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                        FIN 
                      </label>
                      <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                        -
                      </label>
                    </div>
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                        Seriya nömrəsi
                      </label>
                      <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                        -
                      </label>
                    </div>
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                        Email
                      </label>
                      <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                        -
                      </label>
                    </div>
                  </div>
                  {/* <a href="#" className="details-update w-button">MƏLUMATLARI&nbsp;YENİLƏ 555</a> */}
                </fieldset>
              </div>
              <div className="location-details">
                <div className="block-header">
                  <h4 className="checkout-heading">Çatdırılma ünvanım </h4>
                </div>
                {unvanlar.map((unvan, index) => (
                  <fieldset
                    key={index}
                    className="w-commerce-commercecheckoutblockcontent block-content"
                  >
                    <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                      <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                        <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                          Şəhər 
                        </label>
                        <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                          {unvan.city}
                        </label>
                      </div>
                      {unvan.rayon && (
                        <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                          <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                            Rayon
                          </label>
                          <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                            {unvan.rayon}
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                      <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                        <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                          Çatdırılma ünvanı{" "}
                        </label>
                        <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                          {unvan.address}
                        </label>
                      </div>
                    </div>
                    <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                      {unvan.description && (
                        <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                          <label className="w-commerce-commercecheckoutlabel cs-labal-profile">
                            Əlavə qeydlər
                          </label>
                          <label className="w-commerce-commercecheckoutlabel cs-placeholder">
                            {unvan.description}
                          </label>
                        </div>
                      )}
                    </div>
                    <a
                      onClick={() => deleteUnvan(unvan.id, index)}
                      className="details-update details-update_delete w-button"
                    >
                      MƏLUMATLARI&nbsp;SIL
                    </a>
                    {/* <a onClick={()=>deleteUnvan(unvan.id)} className="details-update w-button details-update_sp">Sil</a> */}
                  </fieldset>
                ))}
              </div>

              {/* <div className="prof-infos">
                <div className="block-header">
                  <h4 className="checkout-heading">Mənim məlumatlarım</h4>
                </div>
                <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                  <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-label">
                        Telefon
                      </label>
                      <input
                        type="text"
                        name="address_city"
                        required
                        className="w-commerce-commercecheckoutshippingcity dist-lb"
                      />
                    </div>
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-label">
                        Ad
                      </label>
                      <input
                        type="text"
                        name="address_city"
                        required
                        className="w-commerce-commercecheckoutshippingcity name-lb"
                      />
                    </div>
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-label">
                        Soyad
                      </label>
                      <input
                        type="text"
                        name="address_city"
                        required
                        className="w-commerce-commercecheckoutshippingcity last-lb"
                      />
                    </div>
                  </div>
                  <div className="w-commerce-commercecheckoutrow block-row">
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-label">
                        FIN 
                      </label>
                      <input
                        type="text"
                        name="address_city"
                        required
                    
                        className="w-commerce-commercecheckoutshippingcity dist-lb"
                      />
                    </div>
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-label">
                        Seriya nömrəsi
                      </label>
                      <input
                        type="text"
                        name="address_city"
                        required
                        className="w-commerce-commercecheckoutshippingcity dist-lb"
                      />
                    </div>
                    <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                      <label className="w-commerce-commercecheckoutlabel cs-label">
                        Email
                      </label>
                      <input
                        type="text"
                        name="address_city"
                        required
                        className="w-commerce-commercecheckoutshippingcity dist-lb"
                      />
                    </div>
                  </div>
                  <a href="#" className="save-button w-button">
                    YADDA&nbsp;SAXLA
                  </a>
                </fieldset>
              </div> */}



              <div className="shipping">
                <div className="block-header">
                  <h4 className="checkout-heading">Yeni Çatdırılma ünvanı </h4>
                </div>
                <UnvanFormProfile listCityItems={listCityItems} />
              </div>
              <div className="reset-passwrd">
                <div className="block-header">
                  <h4 className="checkout-heading">Şifrəni dəyiş</h4>
                </div>
                 <ChangePassword />
              </div>
            </div>
            <div
              data-w-tab="my-orders"
              className={
                tab === "my-orders"
                  ? "w--tab-active"
                  : "my-orders-cont w-tab-pane"
              }
            >
              <div className="my-order-content">
                <div className="block-header">
                  <h4 className="checkout-heading">Sifarişlərim</h4>
                </div>
                <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                  <div className="order-status-filter">
                    <div
                      className={
                        orderTab === "all"
                          ? "profile-active-order-tab"
                          : "profile-order-tab"
                      }
                      onClick={() => setOrderTab("all")}
                    >
                      {" "}
                      <span>Hamısı</span>
                    </div>
                    <div
                      className={
                        orderTab === "active"
                          ? "profile-active-order-tab"
                          : "profile-order-tab"
                      }
                      onClick={() => setOrderTab("active")}
                    >
                      {" "}
                      <span>Aktiv</span>
                    </div>
                    <div
                      className={
                        orderTab === "completed"
                          ? "profile-active-order-tab"
                          : "profile-order-tab"
                      }
                      onClick={() => setOrderTab("completed")}
                    >
                      {" "}
                      <span>Tamamlanan</span>
                    </div>
                  </div>
                </fieldset>
              </div>

              {sifarisler !== false ? (
                sifarisler.map((sifaris) => {
                  return sifaris.proformaDetailVmForReportShow.map(
                    (pr, index) => (
                      <div
                        key={index}
                        className={
                          orderTab === "all"
                            ? "order-block-content"
                            : "disable-element-cs"
                        }
                      >
                        <div className="info-div">
                          <div className="info-flex">
                            <div className="info-text-div">
                              <div className="info-stable-text">
                                Sifariş verildi
                              </div>
                              <div className="info-chang-text">
                                {sifaris.docDate.split("T")[0]}
                              </div>
                            </div>
                            <div className="info-text-div">
                              <div className="info-stable-text">Ümumi</div>
                              <div className="info-chang-text">
                                {(
                                  pr.totalPrice +
                                  (pr.totalPrice * pr.percent) / 100
                                ).toFixed()}{" "}
                                AZN{" "}
                              </div>
                            </div>
                            <div className="info-text-div">
                              <div className="info-stable-text">Sifariş №</div>
                              <div className="info-chang-text">
                                {sifaris.proformaNo}
                              </div>
                            </div>
                            <div className="info-text-div">
                              <div className="info-stable-text">Status</div>
                              <div className="done-status">Tamamlandı</div>
                            </div>
                            <a href="#" className="button-45 w-button">
                              Sifarişi izlə
                            </a>
                          </div>
                        </div>
                        <div className="order-info-list">
                          <div className="prds-order-list">
                            <div className="order-info-itm-lii">
                              <div className="product-img-block">
                                
                                <img
                                  src={"https://cdn.otomall.az/" + pr.imageUrl}
                                  loading="lazy"
                                  alt=""
                                  className="product-image"
                                />
                              </div>
                              <div className="info-order-itm">
                                <div className="order-itm-name">
                                  {pr.productName}
                                </div>
                                <div className="order-itm-quantity">
                                  <div className="inf-deta-price">
                                    {(
                                      pr.price +
                                      (pr.price * pr.percent) / 100
                                    ).toFixed()}{" "}
                                    AZN
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              id="w-node-_81ee3d97-6bad-4c05-21ca-87477bc3932e-06695e49"
                              className="rating-div"
                            >
                              {/* <img src={Star} loading="lazy" alt="" className="wh-16 gap-r-6" />
                                        <img src={Star} loading="lazy" alt="" className="wh-16 gap-r-6" />
                                        <img src={Star} loading="lazy" alt="" className="wh-16 gap-r-6" />
                                        <img src={Star} loading="lazy" alt="" className="wh-16 gap-r-6" />
                                        <img src={Star} loading="lazy" alt="" className="wh-16" /> */}
                            </div>
                            <a
                              id="w-node-_81ee3d97-6bad-4c05-21ca-87477bc3932c-06695e49"
                              href="#"
                              className="order-info-button w-button"
                            >
                              Qəbzə bax
                            </a>
                          </div>
                          <div className="order-info-divider" />
                          <div className="product-info-details">
                            <div className="info-text-div">
                              <div className="info-stable-text">Ödəmə növü</div>
                              <div className="info-chang-text">
                                {" "}
                                {sifaris.type == true ? "Nəğd" : "Hissə-hissə"}
                              </div>
                            </div>
                            <div className="info-text-div">
                              <div className="info-stable-text">Rəng</div>
                              <div className="info-chang-text">
                                {pr.color.split("#")[0]}
                              </div>
                            </div>
                            <div className="info-text-div">
                              <div className="info-stable-text">Material</div>
                              <div className="info-chang-text">
                                {pr.material}
                              </div>
                            </div>
                            <div className="info-text-div">
                              <div className="info-stable-text">Ölçü</div>
                              <div className="info-chang-text">
                                {" "}
                                100x100x100
                              </div>
                            </div>
                            <div className="info-text-div">
                              <div className="info-stable-text">Say</div>
                              <div className="info-chang-text">{pr.qty}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })
              ) : (
                <>
                  <div className="order-info-list">
                    <div className="non-elem-denter">Məlumat yoxdur</div>
                  </div>
                </>
              )}

              <div
                className={
                  orderTab === "active"
                    ? "order-block-content"
                    : "disable-element-cs"
                }
              >
                <div className="order-info-list">
                  <div className="non-elem-denter">Məlumat yoxdur</div>
                </div>
              </div>
              <div
                className={
                  orderTab === "completed"
                    ? "order-block-content"
                    : "disable-element-cs"
                }
              >
                <div className="order-info-list">
                  <div className="non-elem-denter">Məlumat yoxdur</div>
                </div>
              </div>
            </div>
            <div data-w-tab="notifi" className={tab === "notifi" ? "w--tab-active" : "notifi-cont w-tab-pane"}>
              <div className="notifi-div">
                <ul role="list" className="notifi-list">
                  {
                    Noti && Noti.map((index, key) => 
                      <li onClick={(event) => readNotification(index.id, event)} className={index.view === true ? "notifi-list-item-read not-readed-notifi" : "notifi-list-item"} key={key}>
                        <div id="w-node-_8da59b7d-d52d-d8fd-715e-a634aea227d4-06695e49" className="notifi-icon-div" >
                          <img src={NotificationIcon} className="image-6"/>
                        </div>
                        <div className="notifi-cont-div">
                          <h6 className="notifi-heading">{`${index.title}`}</h6>
                          <div className="notifi-content-text read" dangerouslySetInnerHTML={{__html: decode(index.description)}}></div>
                        </div>
                        <img src={CloseNotificationIcon} onClick={()=> {removeNotification(index.key, index.id)}} className="cross-notifi-button" />
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileComp;
