import './VoteContainer.css';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';

function VoteContainer({ votes }) {
  return (
    <div className="VoteContainer">
      <button className="vote-button">
        <img src={upvoteIcon} alt="Upvote" />
      </button>
      <p>{votes}</p>
      <button className="vote-button">
        <img src={downvoteIcon} alt="Downvote" />
      </button>
    </div>
  );
}

export default VoteContainer;