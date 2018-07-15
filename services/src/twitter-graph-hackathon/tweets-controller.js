'use strict';

const EventEmitter = require('events');


let CursorfindFilteredTweets = async (db) => {
	let FilteredTweetsFriends01Collection = await db.collection('FilteredTweetsFriends01');

	let TweetsEmitter = new EventEmitter();
	let tweets = [];
		try {
		let cursor = FilteredTweetsFriends01Collection.find();
		let i = 0;
		// console.log({cursor})



		while(await cursor.hasNext()) {
			const doc = await cursor.next();
			TweetsEmitter.emit('tweet', doc);
			tweets.push(doc);
		}

	} catch (err) {
		console.log(err.stack);
	}
	console.log(tweets.length);
	let uniqueIds = [];
	tweets.map((tweet) => {
		if (uniqueIds.indexOf(tweet.user_id) === -1 ) uniqueIds.push(tweet.user_id);
	});
	console.log(uniqueIds.length);
	return tweets;
// TweetsEmitter.on('tweet')
};

let CursorFindUserFollowersMap = async(db) => {
	let LevelAFollowersCollection = await db.collection('LevelAFollowers');
	let followersMap = [];
	const cursor = LevelAFollowersCollection.find();
	try {
		while(await cursor.hasNext()) {
		const followMap = await cursor.next();

		followersMap.push(followMap);
		}
	} catch (err) {
		console.log(err.stack);
	}
	console.log(followersMap.length);
	return followersMap;
};

let CursorFindUserFriendsMap = async(db) => {
	let LevelAFriendsCollection = await db.collection('LevelAFriends');
	let friendsMap = [];
	const cursor = LevelAFriendsCollection.find();
	try {
		while(await cursor.hasNext()) {
			const followMap = await cursor.next();

			friendsMap.push(followMap);
		}
	} catch (err) {
		console.log(err.stack);
	}
	console.log(friendsMap.length);
	return friendsMap;
};

module.exports = { CursorfindFilteredTweets, CursorFindUserFollowersMap, CursorFindUserFriendsMap };