'use strict';

const Graph = require('graph.js/dist/graph.full.js');
const uuid = require('uuid/v4');
let BuildGraph = async (followersMap, friendsMap) => {

		let network = new Graph();

		followersMap.map((vertex) => {
			if (!network.hasVertex(vertex.user_id)) {
				network.addNewVertex(vertex.user_id, vertex._id);
			}
		});

		followersMap.map((vertex) => {
			vertex.followers_list.map((follower_id) => {
				if (network.hasVertex(follower_id)) {
					if (!network.hasEdge(vertex.user_id, follower_id, 'follower')){
						network.addNewEdge(vertex.user_id, follower_id, 'follower')
					}

				}
			})
		});

	friendsMap.map((vertex) => {
		if (!network.hasVertex(vertex.user_id)) {
			network.addNewVertex(vertex.user_id, vertex._id);
		}
	});

	friendsMap.map((vertex) => {
		vertex.friends_list.map((friend_id) => {
			if (network.hasVertex(friend_id)) {
				if (!network.hasEdge(vertex.user_id, friend_id, 'friend')){
					network.addNewEdge(vertex.user_id, friend_id, 'friend')
				}

			}
		})
	});
		return network;
};

module.exports = BuildGraph;