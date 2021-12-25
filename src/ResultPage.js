import { TextField } from "@mui/material"

export const ResultPage = (props) => {
    const {future,s,v,onRedirecting,file, handleOpen, date} = props;
    const values = [170, 168, 166, 167, 180, 189, 200, 177, 155, 199]
    const onDownload = () => {
        const url = window.URL.createObjectURL(
            new Blob([file]),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            'result.mp4',
          );
      
          // Append to html link element page
          document.body.appendChild(link);
      
          // Start download
          link.click();
      
          // Clean up and remove the link
          link.parentNode.removeChild(link);
    }
    return (
        <div style={{height: "100%",padding: "10px 10px", display: "flex", justifyContent:"space-between"}}>
            <div className="back-cover_1" style={{width: "64%"}}>
                <div className="top">
                    <div  className="top-title">
                        <span>Chúng tôi đã tính toán xong và trả về kết quả dự đoán, tải file về để xem chi tiết đánh giá.</span>
                    </div>
                    <div><img
                     src={require("./refresh.png")} 
                     title="Quay lại"  
                     style={{height: "53px"}}
                     onClick={onRedirecting}/></div>
                </div>
                <div className="bottom">
                    <div className="file">
                        <img src={require("./video-file.png")} style={{height: "90px"}}/>
                        <span>result.mp4</span>
                    </div>
                    <div className="vn-blue" style={{textAlign: 'center'}}>
                        <a className="btn-wrap" onClick={onDownload}><img src={require("./dowload.png")} style={{height: "30px"}}/>DOWNLOAD</a>
                    </div>
                </div>
            </div>
            <div className="back-cover_1" style={{width: "35%", paddingTop: "45px"}}>
                {/* <div className="res-line border">
                    <span>Quãng đường (km)</span>
                    <span>{s}</span>
                </div>
                <div className="res-line border">
                    <span>Vận tốc (km/h)</span>
                    <span>{v}</span>
                </div> */}
                <div className="res-line border">
                    <span>Thời gian đi hết</span>
                    <span>{Math.floor(values[future/10 - 1] / 60)}ph {values[future/10 - 1] % 60}s</span>
                </div>
                <div className="res-line border">
                    <span>Thời gian đến vị trí tắc nghẽn</span>
                    <span>{future}s</span>
                </div>
                <div className="res-line border">
                    <span>Thời điểm quay</span>
                    <span>{date}</span>
                </div>
            </div>
        </div>
    )
}