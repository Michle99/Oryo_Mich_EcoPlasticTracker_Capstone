import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMapCoordinates } from "../redux/reportSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Box } from "@mui/material";
// import GoogleMapContainer from "./GoogleMap";


const PollutionMap: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const reports = useSelector((state: RootState) => state.report.reports);

    useEffect(() => {
      // Fetch pollution reports when the component mounts
      dispatch(fetchMapCoordinates());
    }, [dispatch]);
    
    console.log("Display reports from state:", reports[0]);
    return (
        <Box>
            {/* {reports.map((report) => (
                <div key={report._id}>
                    {report.location.coordinates && (
                      <GoogleMapContainer 
                        coordinates={report.location.coordinates} 
                      />
                    )}
                </div>
            ))} */}
        </Box>
    )

};

export default PollutionMap;