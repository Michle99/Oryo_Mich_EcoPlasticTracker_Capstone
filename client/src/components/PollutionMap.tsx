import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../redux/reportSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Box } from "@mui/material";
import GoogleMapContainer from "./GoogleMap";




const PollutionMap: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const reports = useSelector((state: RootState) => state.report.reports);

    useEffect(() => {
        // Fetch pollution reports when the component mounts
        dispatch(fetchReports());
    }, [dispatch]);
    
    return (
        <Box>
            {reports.map((report) => (
                <div key={report._id}>
                  <GoogleMapContainer 
                    coordinates={report.location.coordinates} 
                  />
                </div>
            ))}
        </Box>
    )

};


export default PollutionMap;