// Learn more about destination functions API at
// https://segment.com/docs/connections/destinations/destination-functions

/**
 * Handle track event
 * @param  {SegmentTrackEvent} event
 * @param  {FunctionSettings} settings
 */
async function onTrack(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/track/

	/*collect data from profile*/
	const endpointBaseUrl = 'https://profiles.segment.com/v1/spaces/'; //Base URL for profile API
	debug = true;
	let response;
	let spaceId = '<your_space_id>';
	let token =
		'<your_profile_api_token>';
	let url =
		endpointBaseUrl +
		spaceId +
		'/collections/users/profiles/user_id:' +
		event.userId +
		'/traits';
	if (debug) {
		console.log(url);
		console.log('Pre processing event payload: ' + JSON.stringify(event));
	}
	let responseFromProfile = '';

	//Grab email associated to the user from persona space
	try {
		response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Basic ${btoa(token + ':')}`,
				'Content-Type': 'application/json'
			},
			body: null
		});

		responseFromProfile = await response.json();

		if (debug) {
			console.log(responseFromProfile.traits.email);
		}
		/*end collect data from profile*/
	} catch (error) {
		// Retry on connection error
		throw new RetryError(error.message);
	}

	//event.event = event.event + '-fbp enriched';
	event.properties.email = responseFromProfile.traits.email;
	
	console.log(JSON.stringify(event));
	return event;
}

/**
 * Handle identify event
 * @param  {SegmentIdentifyEvent} event
 * @param  {FunctionSettings} settings
 */
async function onIdentify(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/identify/
	throw new EventNotSupported('identify is not supported');
}

/**
 * Handle group event
 * @param  {SegmentGroupEvent} event
 * @param  {FunctionSettings} settings
 */
async function onGroup(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/group/
	throw new EventNotSupported('group is not supported');
}

/**
 * Handle page event
 * @param  {SegmentPageEvent} event
 * @param  {FunctionSettings} settings
 */
async function onPage(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/page/
	throw new EventNotSupported('page is not supported');
}

/**
 * Handle screen event
 * @param  {SegmentScreenEvent} event
 * @param  {FunctionSettings} settings
 */
async function onScreen(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/screen/
	throw new EventNotSupported('screen is not supported');
}

/**
 * Handle alias event
 * @param  {SegmentAliasEvent} event
 * @param  {FunctionSettings} settings
 */
async function onAlias(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/alias/
	throw new EventNotSupported('alias is not supported');
}

/**
 * Handle delete event
 * @param  {SegmentDeleteEvent} event
 * @param  {FunctionSettings} settings
 */
async function onDelete(event, settings) {
	// Learn more at https://segment.com/docs/partners/spec/#delete
	throw new EventNotSupported('delete is not supported');
}
