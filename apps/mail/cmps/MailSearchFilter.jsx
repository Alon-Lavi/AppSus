const { useState, useEffect } = React;

export function MailSearchFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    const value = target.type === 'number' ? +target.value || '' : target.value;

    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }));
  }

  const { txt } = filterByToEdit;
  return (
    <section className="mail-filter">
      <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="Search 🔎︎" />
    </section>
  );
}
