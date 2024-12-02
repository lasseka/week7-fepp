import JobListings from "../components/JobListings";
import {useEffect, useState} from "react"

const Home = () => {
  const [jobs, setJobs] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async() => {
      try{
        const res = await fetch("api/jobs");
        if(!res.ok){
          throw new Error("Could not fetch jobs (FE)")
        }
        const data = await res.json();
        setIsPending(false)
        setJobs(data)
        setError(null)
      } catch(error){
        setIsPending(false);
        setError(error.message)
      }
  }
  fetchJobs();
}, []);


  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && <JobListings jobs={jobs}/>}
    </div>
  );
};

export default Home;
