const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }],
      ["image"],
    ],
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    // handlers: {
    //   image: imageHandler,
    // },
  },
};

export default modules;
