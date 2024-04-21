import css from './SearchBar.module.css';
import { Formik, Form, Field } from 'formik';

const SearchBar = ({ onSetSearchQuery, searchQuery }) => {
  return (
    <div>
      <Formik
        initialValues={{ query: searchQuery ?? '' }}
        onSubmit={values => {
          onSetSearchQuery(values.query);
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.field}
            type="text"
            name="query"
            autoFocus
            placeholder="Search movies"
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
