import ColumnHeaders from "./ColumnHeaders";
import Entries from "./Entries";

export default function List({ handleNewEntry, entryData }) {
  return (
    <>
      <ColumnHeaders />
      <ol>
        <Entries data={entryData} />
      </ol>
      <button className="w-full text-center" onClick={handleNewEntry}>
        <span className="text-2xl mr-2">+</span>Birthday
      </button>
    </>
  );
}
