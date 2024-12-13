import './VoteContainer.css';

function VoteContainer({ votes }) {
  return (
    <div className="VoteContainer">
      <p>{votes}</p>
    </div>
  );
}

export default VoteContainer;