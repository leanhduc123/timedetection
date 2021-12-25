import { TextField } from "@mui/material"

export const FileInput = (props) => {
    const {file,changeHandler} = props
    return (
        <div style={{height: "100%",padding: "10px 10px"}}>
            <div className="back-cover">
                <div className="film-image">
                    <img src={require("./film.png")} style={{height: "90px"}}/>
                </div>
                <div className="input">
                    <span>Lựa chọn địa điểm để dự đoán mức độ tắc nghẽn trong thời gian thực</span>
                    {/* <TextField
                    id="outlined-basic-1" 
                    size="small" 
                    type="file"
                    onChange={changeHandler}
                    value={file}
                    inputProps={{accept:"video/*"}}
                    /> */}
                </div>
            </div>
        </div>
    )
}