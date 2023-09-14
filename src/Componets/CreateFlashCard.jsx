    import React, { useState, useEffect,useRef } from "react";
    import { LiaFileUploadSolid } from "react-icons/lia";
    import { MdDeleteForever } from "react-icons/md";
    import { BiEdit } from "react-icons/bi";
    import { connect } from "react-redux";
    import { addFlashcard } from "../redux/action/flashcardActions";
    import { useFormik } from "formik";
    import * as Yup from 'yup';


    const mapDispatchToProps = (dispatch) => {
      return {
        addFlashcard: (flashcard) => dispatch(addFlashcard(flashcard)),
      };
    };


    const validationSchema = Yup.object().shape({
      groupName: Yup.string().required('Group Name is required'),
      groupDescription: Yup.string().required('Group Description is required'),
      terms: Yup.array().of(Yup.object().shape({
        termName: Yup.string().required('Term Name is required'),
        termDescription: Yup.string().required('Term Description is required'),
      })),
    });



    const CreateFlashCard = () => {
      const [flashcards, setFlashcards] = useState([]); // Array to store all flashcards
      const initialGroupState = {
        groupName: "",
        groupImage: "",
        groupDescription: "",
      };

      const initialTermState = {
        termName: "",
        termImage: "",
        termDescription: "",
        terms: [], // Initialize 'terms' as an empty array
      };

      const [group, setGroup] = useState(initialGroupState);
      const [term, setTerm] = useState(initialTermState);
      const [termCount, setTermCount] = useState(1); // Number of term sections

      const generateIdUsingTime = () => {
        const timestamp = Date.now();
        return timestamp.toString(); // Convert the timestamp to a string to use it as an ID
      };

      useEffect(() => {
        const storedFlashcards = localStorage.getItem("flashcards");
        if (storedFlashcards) {
          setFlashcards(JSON.parse(storedFlashcards));
        }
      }, []);

      const resetForm = () => {
        setGroup(initialGroupState);
        setTerm(initialTermState); // Reset the term state to its initial state
        setTermCount(1); // Reset the term count to 1
        // Clear the input fields for terms
      };
      
      const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target.result;
          setGroup({ ...group, groupImage: base64Image }); // Update groupImage state
          formik.setFieldValue('groupImageInput', base64Image); // Update Formik field value
          formik.setFieldValue('groupImage', base64Image); // Update Formik field value


        }
        reader.readAsDataURL(file);


      }
      const handleTermImageChange = (file, currentIndex) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target.result;

          const updatedTerms = [...term.terms];
          updatedTerms[currentIndex] = {
            ...updatedTerms[currentIndex],
            termImage: base64Image,
          };

          setTerm((prevTerm) => ({
            ...prevTerm,
            terms: updatedTerms,
          }));
          formik.setFieldValue(`terms[${currentIndex}].termImage`, base64Image); // Update Formik field value
            };

        reader.readAsDataURL(file);
      };

      const handleAddMore = (e) => {
        e.preventDefault();
        setTermCount((prevCount) => prevCount + 1);

        // Create a new term object with the current term input values
        const newTerm = {
          termName: "",
          termDescription: "",
          termImage: "",
        };

        // Update the 'terms' array in the 'term' state
        setTerm((prevTerm) => ({
          ...prevTerm,
          terms: [...prevTerm.terms, newTerm],
        }));
      };

      const formik = useFormik({
        initialValues: {
          groupName: '',
          groupImageInput: '',
          groupDescription: '',
          // terms: []
          terms: Array.from({ length: termCount }, () => ({
            termName: '',
            termDescription: '',
            termImageInput: '',
          })),
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
          const newId = generateIdUsingTime();

          // Create the new flashcard object
          const newFlashcard = {
            id: newId,
            group: {
              groupName: values.groupName,
              groupImage: values.groupImage,
              groupDescription: values.groupDescription,
            }, // Use values.group instead of group
            terms: values.terms
          };



          // Update the local state flashcards array
          setFlashcards([...flashcards, newFlashcard]);

          // Update localStorage
          const updatedFlashcards = [...flashcards, newFlashcard];

          localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));

          // Dispatch the addFlashcard action to update Redux store
          addFlashcard(newFlashcard);

          // Reset the 'group', 'term', and 'termCount' states to their initial empty values
          resetForm();
          setTermCount(1);
          // Reset the 'term' state with one empty term
          setTerm(initialTermState);
        
        }
      })

      const handleDeleteTerm = (index) => {
        formik.setFieldValue(
          'terms',
          formik.values.terms.filter((_, i) => i !== index)
        );
        setTermCount((prevCount) => prevCount - 1); // Decrease termCount when a term is deleted
      };
      const termTitleRefs = useRef([]);


      return (
        <form onSubmit={formik.handleSubmit}>
          <div className="container mx-auto">
            {/* Group Section */}
            <div className="mt-5 bg-white h-96 shadow-md rounded-lg">
              <div className="flex">
                <div className="input ml-10">
                  <label htmlFor="groupName" className="block text-blue-700">
                    Create Group*
                  </label>
                  <input
                    type="text"
                    id="groupName"
                    value={formik.values.groupName}
                    {...formik.getFieldProps('groupName')} // Use getFieldProps to automatically handle formik state
                    className="border-2 border-blue-300 w-96 h-12 mt-2"
                  />
                  {formik.errors.groupName && formik.touched.groupName && (
                    <div className="text-red-500">{formik.errors.groupName}</div>
                  )}
                </div>
                {formik.values.groupImageInput ? (
                  <img
                    src={formik.values.groupImageInput}
                    alt="Group Preview"
                    style={{ maxWidth: "100px" }}
                  />
                ) : (
                  <>
                    <div className="ml-5 flex flex-row mt-8 border-2 border-blue-300 w-44 h-12 justify-center">
                      <LiaFileUploadSolid className="text-blue-500 text-3xl mt-2" />
                      <label
                        htmlFor="groupImageInput"
                        className="mt-3 ml-2 text-blue-700"
                      >
                        Upload Image
                      </label>

                      <input
                        type="file"
                        id="groupImageInput"
                        value={formik.values.groupImageInput}
                        name="groupImageInput"
                        className="hidden"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                      />
                    </div>
                  </>
                )
                }
              </div>
              <div className="mt-6 ml-10">
                <label htmlFor="groupDescription" className="block text-blue-700">
                  Add Description
                </label>
                <textarea
                  id="groupDescription"
                  type="text"
                  value={formik.values.groupDescription}
                  {...formik.getFieldProps('groupDescription')}
                  className="w-4/5 h-40 border-2 border-blue-300"
                ></textarea>
                {formik.errors.groupDescription && formik.touched.groupDescription && (
                  <div className="text-red-500">{formik.errors.groupDescription}</div>
                )}
              </div>
            </div>

            {/* Term Section */}
            <div className="bg-white mt-10  rounded-lg shadow-md ">
              {Array.from({ length: termCount }).map((_, index) => (
                <div key={index} className="flex flex-row justify-around">
                  <div className="w-12 h-12 rounded-full bg-red-700 top-11 text-white text-center mt-28 ml-2">
                    <p className="mt-3">{index + 1}</p>
                  </div>
                  <div className="mt-20 ">
                    <label htmlFor="termName" className="block text-blue-700 mb-4">
                      Enter Term
                    </label>
                    <input
                      type="text"
                      id={`term.${index}.termName`}
                      name={`term.${index}.termName`}
                      value={formik.values.terms[index]?.termName} // Use optional chaining to handle initial empty values
                      {...formik.getFieldProps(`terms[${index}].termName`)} // Use getFieldProps for termName
                      ref={(inputRef) => (termTitleRefs.current[index] = inputRef)} // Use ref to focus on the input field
                      className="border-2 border-blue-300 w-96 h-12"
                    />
                    {formik.errors.terms && formik.errors.terms[index]?.termName && formik.touched.terms && formik.touched.terms[index]?.termName && (
                      <div className="text-red-500">{formik.errors.terms[index].termName}</div>
                    )}
                  </div>
                  <div className="mt-20">
                    <label
                      htmlFor="termDescription"
                      className="block text-blue-700 mb-4"
                    >
                      Enter Definition
                    </label>
                    <input
                      type="text"
                      id={`term.${index}.termDescription`}
                      name={`term.${index}.termDescription`}
                      value={formik.values.terms[index]?.termName} // Use optional chaining to handle initial empty values
                      {...formik.getFieldProps(`terms[${index}].termDescription`)} // Use getFieldProps for termName
                      className="border-2 border-blue-300 w-96 h-12"
                    />
                    {formik.errors.terms && formik.errors.terms[index]?.termDescription && formik.touched.terms && formik.touched.terms[index]?.termDescription && (
                      <div className="text-red-500">{formik.errors.terms[index].termDescription}</div>
                    )}

                  </div>
                  {term.terms[index]?.termImage ? (
                    <div className="flex">

                      <div className="border-2 border-black w-28 h-24 mt-24 mr-5 flex justify-between">

                        <img
                          src={term.terms[index]?.termImage}
                          alt={`Term ${index} Preview`}
                          style={{ maxWidth: "100px" }}
                        />
                      </div>

                    </div>
                  ) : (<div className="mt-32 mr-20">
                    <label
                      htmlFor={`term.${index}.termImageInput`}
                      className="border-2 border-blue-300 text-blue-700 p-5"
                    >
                      Select Term Image
                    </label>
                    <input
                      type="file"
                      id={`term.${index}.termImageInput`}
                      {...formik.getFieldProps(`terms[${index}].termImageInput`)}
                      className="hidden"
                      onChange={(e) => handleTermImageChange(e.target.files[0], index)} // Handle term image change
                    />


                  </div>
                  )}
                  {formik.values.terms[index]?.termName && (
                    <div className="mt-28 mr-10">
                      < MdDeleteForever className="mb-5 text-2xl text-red-600" onClick={() => handleDeleteTerm(index)} />
                      <BiEdit className="mb-5 text-2xl text-blue-600"
                        onClick={() => termTitleRefs.current[index]?.focus()}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="ml-20 mt-10">
                <a href="/" className="text-blue-700 mb-10" onClick={handleAddMore}>
                  + Add more
                </a>
              </div>
            </div>

            <div className="mx-auto flex justify-center mt-24 mb-20">
              <button className="bg-red-700 text-white p-4 px-16 rounded-md" type="submit">
                Create
              </button>
            </div>
          </div>
        </form >
      );
    };

    export default connect(null, mapDispatchToProps)(CreateFlashCard);
