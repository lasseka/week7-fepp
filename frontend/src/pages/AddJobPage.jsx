import {useState} from "react";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  
  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitForm called");

    if (!title || !type || !description || !companyName ||!contactEmail || !contactPhone){
      console.log("Fill the missing fields")
      return
  }

  const newJob = {
    title,
    type,
    description,
    company: {
      name: companyName,
      contactEmail,
      contactPhone
    }
  }
  addJob(newJob)

  async function addJob(newJob){
    try{
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(newJob)
      })
      if (res.ok){
        console.log("Job added successfully")
      } else {
        console.error("Error creating job (FE)")
      }
    } catch(error){
      console.error("Error adding job (FE)", error)
    }
  }
}


  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select id="type" value={type} onChange={(e => setType(e.target.value))} >
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}

        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e)=> setContactPhone(e.target.value)}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};
export default AddJobPage;
