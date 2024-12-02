import {useNavigate, useParams} from "react-router-dom"
import {useEffect,useState} from "react"

const JobPage = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [job,setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const deleteJob = async(id) => {
        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method:"DELETE",
            });
            if (!res.ok){
                throw new Error("Failed to delete job (FE)")
            }
        } catch (error){
            console.error("Error deleting job:",error)
        }
    }

    useEffect(() => {
        const fetchJob = async() => {
            try {
                console.log("id: ", id);
                const res = await fetch (`/api/jobs/${id}`)
                if (!res.ok){
                    throw new Error("Error finding job (FE)")
                }
                const data = await res.json();
                setJob(data)
            } catch (error){
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchJob();
    }, [id])

    const onDeleteClick = (jobId) => {
        const confirm = window.confirm(
            "Delete?"
        );
        if(!confirm) return;
        deleteJob(jobId)
        navigate("/")
    }

    return(
        <div className="jobDetails">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <h2>{job.title}</h2>
            <p>Type: {job.type}</p>
            <p>Description: {job.description}</p>
            <p>Company: {job.company.name}</p>
            <p>Email: {job.company.contactEmail}</p>
            <p>Phone: {job.company.contactPhone}</p>
            <button onClick={() => onDeleteClick(job._id)}>Delete</button>
            <button onClick={()=>navigate(`/edit-job/${job._id}`)}>Edit</button>
          </>
        )}
      </div>
    )

}

export default JobPage;