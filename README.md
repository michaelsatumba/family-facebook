## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

<!-- **Note: Delete this note and update the table of contents based on what sections you keep.** -->

## Overview

### The challenge

Users should be able to:

- Log in via google
- Create post
- Read post
- Update post
- Delete post
- Log out via google

### Screenshot

![](./screenshot1.png)
![](./screenshot2.png)

<!-- Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above. -->

<!-- **Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.** -->

### Links

<!-- - Solution URL: [Add solution URL here](https://your-solution-url.com) -->

- Live Site URL: [Live Site](https://family-facebook.vercel.app/)

## My process

JSX layout, Tailwind styling, set up firebase, logic

### Built with

- Next.js
- Tailwind
- Firebase

### What I learned

I learned how to interact with the firebase database: firestore. I learned how to create, read, update, delete items in the database.

```Example
useEffect(() => {
		const q = query(colRef, orderBy('timestamp', 'desc'));
		onSnapshot(q, (snapshot) => {
			let post = [];
			snapshot.docs.forEach((doc) => {
				post.push({ ...doc.data(), id: doc.id });
			});
			setPosts(post);
		});
	}, [db]);
```

<!-- Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge. -->

<!-- To see how you can add code snippets, see below: -->

```html
<div>
					{posts.map((post, id) => (
						<div
							key={id}
							className="bg-gray-700 my-2 w-screen flex flex-col items-center"
						>
							<input
								className="bg-gray-700"
								type="text"
								value={post.text}
								onChange={(e) => handleChange(e, post.id, post)}
							/>
							<div className="flex">
								<p>by {post.author}</p>

								{post.photoURL && (
									<div className="h-8 w-8 relative rounded-lg mx-2">
										<Image
											src={post.photoURL}
											alt="uploaded file"
											layout="fill"
											className="rounded-full"
										/>
									</div>
								)}
							</div>
							<div className="space-x-2">
								<button
									className={`${
										currentId === post.id ? 'bg-blue-500' : 'bg-gray-500'
									} my-2 rounded-md px-5 py-1`}
									onClick={() => handleUpdate(post)}
									disabled={currentId !== post.id}
								>
									Update
								</button>
								<button
									className={`${
										user?.photoURL == post.photoURL
											? 'bg-red-500'
											: 'bg-gray-500'
									} rounded-md px-5 py-1`}
									onClick={() => remove(post)}
									disabled={user?.photoURL !== post.photoURL}
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
```

```css
	<button
					className={`${
						incompleteForm ? 'bg-gray-500' : 'bg-blue-500'
					} my-2 rounded-md px-40 py-1`}
					disabled={incompleteForm}
					onClick={submit}
				>
					Post
				</button>
```

```js
const [currentId, setCurrentId] = useState(null);
const handleChange = (e, id, post) => {
	if (user.photoURL == post.photoURL) {
		setCurrentId(post.id);
		setPosts((posts) => {
			//(M2) Here
			return posts.map((post) => {
				if (post.id === id) {
					return {
						...post,
						text: e.target.value,
					};
				} else {
					return {
						...post,
					};
				}
			});
		});
	}
};
```

<!-- If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more. -->

<!-- **Note: Delete this note and the content within this section and replace with your own learnings.** -->

### Continued development

<!-- Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

Create Image posts

<!-- **Note: Delete this note and the content within this section and replace with your own plans for continued development.** -->

### Useful resources

- [Firebase](https://firebase.google.com/) - DB.
- [Facebook](https://www.facebook.com/) - Inspiration.
<!-- - [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.** -->

## Author

- Website - [Michael Satumba](https://mkeport.vercel.app/)
<!-- - Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername) -->

<!-- **Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.** -->

## Acknowledgments

<!-- This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->

Thank you for my friend Pizza & my cousin Erlo for helping me with this project.

<!-- **Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.** -->
