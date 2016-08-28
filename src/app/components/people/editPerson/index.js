import React, { PropTypes } from 'react';

export default function EditPerson({ params: { id } }) {
  return (
    <div>
      testing edit person id { id }
    </div>
  );
}

EditPerson.propTypes = {
  params: PropTypes.object,
};