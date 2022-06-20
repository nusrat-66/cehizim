
import ExampleIMG from '../../../assets/images/exampleProductImage.jpeg';
export default function AboutHeadComp() {
    return(
        <>
        <div className="about wf-section">
            <div className="dv-wrapper">
                <div className="w-layout-grid portrait-grid">
                <div id="w-node-a191a1f3-72cb-0f34-1d6c-69bc34400e86-0ffe6132" className="about-txt-blck">
                    <h2 className="about-heading">Haqqımızda</h2>
                    <div className="about-container">
                    <div className="about-desc">Müştərilərimizə təklif etdiyimiz nağd və kredit ilə ödəmə imkanları ilə yanaşı, ilkin ödənişsiz və kredit kartı olmadan müqaviləli ödəniş imkanlarımızın üstünlüklərindən də istifadə edirik; Yüksək keyfiyyətli xidmətimiz, keçmişdən gələn təcrübəmiz, müştəri məmnuniyyətimiz və möhkəm maliyyə quruluşumuzla Azərbaycanın hər yerindən müştərilərimizlə birlikdə böyüməyə davam edirikş. Cehizim.az sizə ən yaxşı xidməti göstərmək üçün özünü daim təkmilləşdirir və inkişaf edən texnologiyaya paralel olaraq məhsul çeşidini yeniləyir və genişləndirir.</div>
                    </div>
                </div>
                <div id="w-node-_97f3ac03-d897-1616-ae27-5404d91e242d-0ffe6132" className="about-head-img-right">
                    <img className="about-head-img" src={ExampleIMG} height={497} alt="" sizes="(max-width: 479px) 93vw, (max-width: 767px) 94vw, (max-width: 991px) 95vw, 96vw" data-w-id="a191a1f3-72cb-0f34-1d6c-69bc34400e8c" id="w-node-a191a1f3-72cb-0f34-1d6c-69bc34400e8c-0ffe6132" loading="lazy" />
                </div>
                </div>
            </div>
        </div>
        </>
    );
}