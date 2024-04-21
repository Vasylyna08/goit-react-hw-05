import toast from 'react-hot-toast';

const notify = () =>
  toast('Please, enter the text!', {
    duration: 3000,
    icon: '🤨',
  });

const noquery = () =>
  toast(
    'Sorry, there are no movies matching your search query. Please try again!',
    {
      duration: 3000,
      icon: '🥺',
    }
  );

export { noquery, notify };
