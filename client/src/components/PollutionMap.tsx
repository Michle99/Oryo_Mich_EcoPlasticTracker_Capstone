import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../redux/reportSlice";
import { AppDispatch, RootState } from "../redux/store";




const PollutionMap: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const reports = useSelector((state: RootState) => state.report.reports);

    useEffect(() => {
        // Fetch pollution reports when the component mounts
        dispatch(fetchReports());
    }, [dispatch]);
    
    return (
        <>
        </>
    )

};


export default PollutionMap;