import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';

function SearchPanel () {
    const {getCharacterByName} = useMarvelService();
    const [searchError, setSearchError] = useState(false);
    const [char, setChar] = useState({});

    const searchChar = (value) => {
        getCharacterByName(value)
            .then(data => setChar(data))
            .catch(error => setSearchError(true));
    }

    const validationError = searchError ? <div className='input-error'>The character was not found. Check the name and try again</div> : null;
    const validationSuccsess = char.name ?
                                    <>
                                        <div className='input-succsess'>There is! Visit {char.name} page?</div>
                                        <button className='btn btn-grey'>TO PAGE</button>
                                    </> : null;
                                
    return (
        <div className='content-search'>
            Or find a character by name:
            <Formik
                initialValues={{ name: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        setSearchError(false);
                        setChar({});
                        errors.name = 'This field is required';
                    } 
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setChar({});
                    setSearchError(false);
                    setSubmitting(false);
                    searchChar(values.name);
                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='input-form'>
                            <Field type='text' name='name' placeholder='Enter name' />
                            <button type='submit' disabled={isSubmitting} className='btn btn-red'>FIND</button>
                            <ErrorMessage name="name" component="div" className='input-error'/>
                            {validationError}
                            {validationSuccsess}
                        </div> 
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SearchPanel;