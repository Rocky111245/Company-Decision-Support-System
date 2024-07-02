const updateNetStock = async () => {
    try {
      const response = await fetch('/api/updateNetStock', {
        method: 'POST',
      });
      if (response.ok) {
        console.log('Net Stock updated successfully.');
        // Add any additional logic or UI updates here
      } else {
        console.error('Failed to update Net Stock.');
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error or display an error message
    }
  };
  
  export { updateNetStock };
  