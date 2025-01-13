// importing hooks to manage states of a variable (useState) and 
// useEffect for performing side effects in function components (e.g., fetching data when a component mounts).
import { useState, useEffect } from "react";   

// import hooks useParams to access route parameters 
// and useNavigate which allows programatic navigation.  
import { useParams, useNavigate } from "react-router-dom"; // importing useparams

export default function Record() {
  const [form, setForm] = useState({ // state that holds the current values of the form fiels. 
    name: "",
    position: "",
    level: "",
  });
  // boolean state used to determine if you're creating a new record or updating an existing one.
  const [isNew, setIsNew] = useState(true);  

  // params holds the route parameters such as id retrieved from useParams().
  const params = useParams();

  // redirect programatically after form submission. 
  const navigate = useNavigate();

  // this hook runs when the component mounts or when the params.id changes (URL parameter change).
  // this functio is designed to fetch and populate data when user is editing a record. 
  useEffect(() => {
    async function fetchData() {
      // checks if params id exists
      const id = params.id?.toString() || undefined; 
      if(!id) return; // function exit early if id doesn't exist. 
      setIsNew(false); // if id exists, it implies the use is updating an existing record vs adding a new one.
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) { // checks if response status is unsuccessful (404, 500, etc)
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json(); // parses the response json into a javascript object. 
      if (!record) { // checks if the fetched data is null or undefined. 
        console.warn(`Record with id ${id} not found`); // logs a warning if the record is not found. 
        navigate("/"); // redirects user to the home page since the record does not exist. 
        return; // exist the function after redirecting. 
      }
      setForm(record); // updates the form state with fetched data allowing the user to edit it. 
    }
    fetchData(); // calls the fetchdata function to fetch the record when useEffect runs. 
    return;
  }, [params.id, navigate]); // use effect runs whenever params.id or navigate changes. 

  // these methods will update the state properties.

  // this is a function declaration. value is expected to be an object containing 
  // key value pairs that represent updates to the form's state. 
  function updateForm(value) { 
    // react's state updator function can take a callback function that provides
    // the previous state (prev) as its argument. this ensures updates are based on the most recent state. 
    return setForm((prev) => {  // (prev) => {} is a callback function allowing a state to acess previous value. 
      // updates the form's state by combining the previous state with new updates from value. 
      return { ...prev, ...value };
    });
  }

  // this function will handle the submission of the data to the backend database.
  async function onSubmit(e) { 
    e.preventDefault(); // prevents a page reload upon submission (default behavior).
    const person = { ...form }; // creates an object that containts data from the form state. 
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // specifies that we're sending json data. 
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person), // (the form data) is converted to a JSON string and sent in the request body.
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) { // catches error that may have occured during the request.  
      console.error('A problem occurred adding or updating a record: ', error);
    } finally { // this block is executed regardless if the request was successful or not. 
      setForm({ name: "", position: "", level: "" }); // the form fields are cleared. 
      navigate("/"); // page programatically re-navigates. 
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Employee Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Employee Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Last"
                    value={form.name}
                    // whenever user types in the input box, onChange function is called. 
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Position
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="position"
                    id="position"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Developer Advocate"
                    value={form.position}
                    onChange={(e) => updateForm({ position: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Position Options</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="positionIntern"
                      name="positionOptions"
                      type="radio"
                      value="Intern"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.level === "Intern"}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    <label
                      htmlFor="positionIntern"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Intern
                    </label>
                    <input
                      id="positionJunior"
                      name="positionOptions"
                      type="radio"
                      value="Junior"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.level === "Junior"}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    <label
                      htmlFor="positionJunior"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Junior
                    </label>
                    <input
                      id="positionSenior"
                      name="positionOptions"
                      type="radio"
                      value="Senior"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.level === "Senior"}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    <label
                      htmlFor="positionSenior"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Senior
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Employee Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}