(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_6FFFF979_E732_5BCF_41E4_59114F01BDDC]); this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_9351589C_A937_B7F1_41DB_55CD4F143408].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_9E6CE30B_A972_7AD7_41D9_0DE16689568A",
  "this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51",
  "this.Image_934ED513_A952_BEF7_41E0_E26023E43F55",
  "this.Container_98C41731_A952_B932_41B9_D5783E3A5F9C",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getKey": function(key){  return window[key]; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "registerKey": function(key, value){  window[key] = value; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "existsKey": function(key){  return key in window; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; }
 },
 "scrollBarOpacity": 0.5,
 "buttonToggleFullscreen": "this.IconButton_9351589C_A937_B7F1_41DB_55CD4F143408",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "gap": 10,
 "height": "100%",
 "paddingBottom": 0,
 "buttonToggleMute": "this.IconButton_9E6C130B_A972_7AD7_41D8_6C2301FA4627",
 "downloadEnabled": false,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "class": "Player",
 "overflow": "visible",
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0.33,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73062173_E935_ABC3_41E0_06A4B2183521"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 71.07,
   "backwardYaw": -81.57,
   "distance": 1,
   "panorama": "this.panorama_ADB7E26B_A733_C07A_41D0_353E50432948"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -81.44,
   "backwardYaw": -175.02,
   "distance": 1,
   "panorama": "this.panorama_ADB65971_A733_C066_41D2_90E2F61C696F"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A",
 "thumbnailUrl": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_t.jpg",
 "label": "Picsart_25-07-15_18-38-36-564",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_8488147D_A752_405E_41D9_C2A650BD7646",
  "this.overlay_82579AE4_A752_406E_41D4_2BFA6158305A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 125,
  "class": "PanoramaCameraPosition",
  "yaw": -174.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71072302_E935_AF3D_41A1_76426CE3539C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -172.35,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73EF8070_E935_A9DD_41E6_100BCE45C3C6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71E0426F_E935_A9C3_41D4_8B7B20D3ED76"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_707531F2_E935_AADD_41B2_C438B18CA12A"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_60B025AF_EF4D_AB43_41E2_EEB046A92594",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.62,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7308417C_E935_ABC5_41D0_8679135EEA02"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB19940_A732_41A6_41CE_69940E32F586"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB65971_A733_C066_41D2_90E2F61C696F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB7E26B_A733_C07A_41D0_353E50432948"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085"
  }
 ],
 "hfov": 30,
 "partial": true,
 "id": "panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A",
 "thumbnailUrl": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_t.jpg",
 "label": "\u0630\u0630\u0630",
 "pitch": 0,
 "hfovMax": 30,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 58,
      "tags": "ondemand",
      "colCount": 58,
      "width": 29696,
      "height": 29696
     },
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 29,
      "tags": "ondemand",
      "colCount": 29,
      "width": 14848,
      "height": 14848
     },
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 15,
      "tags": "ondemand",
      "colCount": 15,
      "width": 7680,
      "height": 7680
     },
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0/f/5/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0/f/6/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_t.jpg"
  }
 ],
 "vfov": 16.88,
 "overlays": [
  "this.overlay_727DF16B_EF76_6BC3_41E1_14C99906A52B",
  "this.overlay_6778ECCF_EF52_BAC3_41E9_51E6C771A40B",
  "this.overlay_6C21E079_EF52_69CE_41D4_AE5C4BD8EB6C",
  "this.overlay_0B0F7524_EF55_AB46_41E8_FFC55D51EE93",
  "this.overlay_0861BFC9_EF55_F6CE_41B3_01E94CEB54BE",
  "this.overlay_7CC914C2_EF55_AAC2_41D2_8EF13F8A2D97",
  "this.overlay_77E6C805_EF56_D946_41D2_AC55192743A4"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E16D3AB_E935_AF43_41E2_6DE0FD4A93F3"
},
{
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyPaddingRight": 0,
 "id": "window_9C40B18A_A952_F9D1_41D2_9129198E0A78",
 "backgroundColorRatios": [],
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "horizontalAlign": "center",
 "headerBackgroundOpacity": 0,
 "bodyBackgroundColorDirection": "vertical",
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Window105976"
 },
 "bodyBackgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "footerHeight": 5,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "layout": "vertical",
 "titlePaddingLeft": 5,
 "shadowVerticalLength": 0,
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "modal": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "veilColorDirection": "horizontal",
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonPressedIconLineWidth": 3,
 "shadow": true,
 "titlePaddingTop": 5,
 "class": "Window",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "bodyPaddingBottom": 0,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid72630FB2_E932_575D_41DB_5FCF09801F3C"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "closeButtonIconColor": "#B2B2B2",
 "closeButtonPressedBackgroundColor": [],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerBorderColor": "#000000",
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [],
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingBottom": 5,
 "closeButtonIconLineWidth": 2,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "paddingTop": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -179.67,
   "backwardYaw": 0.92,
   "distance": 1,
   "panorama": "this.panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772",
 "thumbnailUrl": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_t.jpg",
 "label": "Picsart_25-07-14_17-23-33-940",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_82438F8B_A74E_C0BA_41CC_FBA05AC02956"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 3.66,
   "backwardYaw": -30.85,
   "distance": 1,
   "panorama": "this.panorama_ADAF246F_A732_407A_41C1_2383D9E99C42"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 138.54,
   "backwardYaw": -127.46,
   "distance": 1,
   "panorama": "this.panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -34.69,
   "backwardYaw": -74.16,
   "distance": 1,
   "panorama": "this.panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E",
 "thumbnailUrl": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_t.jpg",
 "label": "IMG_20250717_224035_717",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_B08E52D1_A752_40A6_41D9_4C886816C9F9",
  "this.overlay_BFA45CB2_A74E_40EA_41D3_0CD1B6A2FA72",
  "this.overlay_265B3770_A956_5931_41C9_B6F49329270D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -94.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70A591C8_E935_AACD_41B6_3160C18CFD17"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "VideoPlayListItem",
   "start": "this.viewer_uid72636FB0_E932_575D_41E2_48EC88ED0D97VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_70D4D9AE_E95E_5B42_41E7_0E017183E985, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_70D4D9AE_E95E_5B42_41E7_0E017183E985, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid72636FB0_E932_575D_41E2_48EC88ED0D97VideoPlayer)",
   "media": "this.video_70071F1D_E9D5_D747_41E2_49B9BE83ABEF",
   "player": "this.viewer_uid72636FB0_E932_575D_41E2_48EC88ED0D97VideoPlayer"
  }
 ],
 "id": "playList_70D4D9AE_E95E_5B42_41E7_0E017183E985"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_704DC225_E935_A947_41D1_DDDB0CA95E07"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -94.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70AFD1D1_E935_AADF_41C8_314D12C1BB21"
},
{
 "class": "FadeOutEffect",
 "duration": 700,
 "id": "effect_76B7FFD8_EBD6_56CE_41C5_93044947B380",
 "easing": "linear"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -171.21,
   "backwardYaw": -53.29,
   "distance": 1,
   "panorama": "this.panorama_ADB3D7F0_A732_4066_41D0_840464573FEC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 19.46,
   "backwardYaw": 152,
   "distance": 1,
   "panorama": "this.panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -74.71,
   "backwardYaw": -81.92,
   "distance": 1,
   "panorama": "this.panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D",
 "thumbnailUrl": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_t.jpg",
 "label": "Picsart_25-07-21_22-30-12-063",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_F52D9C15_A8FE_CEF3_41DE_F2735A5AF6FD",
  "this.overlay_F7199BD5_A8FD_C973_41A0_F3E40C3DB67E",
  "this.overlay_F78282E4_A8F3_DB51_41DA_923EACFC1053"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -23.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7338714F_E935_ABC3_41D6_C7E3AB7B8FF6"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -58.1,
   "backwardYaw": 81.64,
   "distance": 1,
   "panorama": "this.panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 27.97,
   "backwardYaw": -19.25,
   "distance": 1,
   "panorama": "this.panorama_ADB215DB_A732_405A_41E3_2A738B528018"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD414B66_A732_C06A_41C3_15520ACE14D1",
 "thumbnailUrl": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_t.jpg",
 "label": "Picsart_25-07-21_22-09-14-830",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_FBCB1F6B_A8FE_4957_41D2_E6B824066C25",
  "this.overlay_F419847C_A8FF_FF31_4192_9F5193F527B1"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "class": "PanoramaCameraPosition",
  "yaw": 104.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E8CE35C_E935_AFC5_41CA_9287F6968224"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_camera"
},
{
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyPaddingRight": 0,
 "id": "window_722022E9_E9D2_AECF_41BD_8E04FCC54FF0",
 "backgroundColorRatios": [],
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "horizontalAlign": "center",
 "headerBackgroundOpacity": 0,
 "bodyBackgroundColorDirection": "vertical",
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Window348408"
 },
 "bodyBackgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "footerHeight": 5,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "layout": "vertical",
 "titlePaddingLeft": 5,
 "shadowVerticalLength": 0,
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "modal": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "veilColorDirection": "horizontal",
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonPressedIconLineWidth": 3,
 "shadow": true,
 "titlePaddingTop": 5,
 "class": "Window",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "bodyPaddingBottom": 0,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid72636FB0_E932_575D_41E2_48EC88ED0D97"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "closeButtonIconColor": "#B2B2B2",
 "closeButtonPressedBackgroundColor": [],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerBorderColor": "#000000",
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [],
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingBottom": 5,
 "closeButtonIconLineWidth": 2,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "paddingTop": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -53.37,
   "backwardYaw": -57.75,
   "distance": 1,
   "panorama": "this.panorama_ADB24E65_A732_406E_41C7_08796165960B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -178.32,
   "backwardYaw": 1.61,
   "distance": 1,
   "panorama": "this.panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A",
 "thumbnailUrl": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_t.jpg",
 "label": "IMG_20250718_000913_853",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_B3793F04_A75E_C1AD_41CF_22CA8D4B2AAC",
  "this.overlay_BE2BB0D9_A772_40A6_41D3_ADF23EBC1E56"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 7.65,
   "backwardYaw": -81.8,
   "distance": 1,
   "panorama": "this.panorama_ADB7C699_A732_40A6_41A1_27020D79BC08"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -146.78,
   "backwardYaw": -34.35,
   "distance": 1,
   "panorama": "this.panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -30.3,
   "backwardYaw": -0.59,
   "distance": 1,
   "panorama": "this.panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677"
  }
 ],
 "hfov": 360,
 "label": "IMG_20250520_020451_817",
 "id": "panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88",
 "thumbnailUrl": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_BAFA7502_A752_41AA_41DC_EB80B195646B",
  "this.overlay_B95E3748_A752_C1A5_418C_9A0295CF1DD8",
  "this.overlay_247C62CF_A952_DB6F_41C1_9EFC3EC7157F"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 96.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_714492D9_E935_AECF_41E0_5F051E21DAE2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_camera",
 "initialPosition": {
  "hfov": 25,
  "class": "PanoramaCameraPosition",
  "yaw": -0.92,
  "pitch": 0.73
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_camera"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_76845128_EB73_EB4D_41E4_184DF12C6FCA",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.8,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70D801A7_E935_AB43_41E5_5F76A7DCA60A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 5.18,
   "backwardYaw": 90.5,
   "distance": 1,
   "panorama": "this.panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 178.82,
   "backwardYaw": -95.99,
   "distance": 1,
   "panorama": "this.panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB0B76A_A732_407A_41E4_8D55B283318E",
 "thumbnailUrl": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_t.jpg",
 "label": "IMG_20250722_192153_640",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_EAEC3642_A973_BB56_41D5_410927987012",
  "this.overlay_E5AD5405_A972_FED2_41E1_14529821D807"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AD4103F5_A732_C06F_415C_0C084836D4FB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AD4103F5_A732_C06F_415C_0C084836D4FB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_664C4660_E95E_69FD_41D0_4F1548541EF6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_664C4660_E95E_69FD_41D0_4F1548541EF6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AD429AA5_A732_40EE_41E2_BAA850034578"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AD429AA5_A732_40EE_41E2_BAA850034578"
  }
 ],
 "hfov": 30,
 "partial": true,
 "id": "panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282",
 "thumbnailUrl": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_t.jpg",
 "label": "Screenshot 2025-08-21 190342",
 "pitch": 0,
 "hfovMax": 74.32,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_t.jpg"
  }
 ],
 "vfov": 53.38,
 "overlays": [
  "this.overlay_60009345_EB5D_AFC7_416D_9F64453096A8",
  "this.overlay_0E0A3BF6_EB53_FEC5_41CE_AC15511E0260",
  "this.overlay_60244FB6_EB53_B745_41CC_367FFBD8ABE7",
  "this.overlay_717DEAF7_EB52_7EC3_41E2_3C318504315A",
  "this.overlay_705BE194_EB52_AB45_41A1_1ACDCECA44C5",
  "this.overlay_0D9B0A0B_EB52_D943_41C7_AF48F374B5C9",
  "this.overlay_0CA4D238_EB55_E94D_419F_015CAB75B130",
  "this.overlay_0C746E95_EB55_B947_41E2_FBFBC3B00427",
  "this.overlay_0AAC1B14_EB56_7F45_41DC_92592993300F",
  "this.overlay_603F1AFB_EB56_BEC3_41D4_84C15C0A4D53",
  "this.overlay_1C587D99_EB56_DB4F_417C_B5CC739C9742",
  "this.overlay_603C5958_EB56_DBCD_41E0_CF0D8B45884E",
  "this.popup_0B767245_EB4E_A9C7_41E7_FA9EC1FACAE1"
 ]
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_7684A128_EB73_EB4D_41E6_D4230BC646BB",
 "easing": "cubic_in_out"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 85.56,
   "backwardYaw": 94.2,
   "distance": 1,
   "panorama": "this.panorama_AD419A66_A732_C06D_41CD_464B3C602523"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.89,
   "backwardYaw": -176.57,
   "distance": 1,
   "panorama": "this.panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84",
 "thumbnailUrl": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_t.jpg",
 "label": "PANO_20250426_091717_2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_E28A8DE4_A8D5_C951_41B4_61CFDB16F8F2",
  "this.overlay_FDD93998_A8DE_49F1_41D3_FEB5BFF979CA"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -154.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0FFF43C6_E935_AEC5_41E9_B1ADFEC33054"
},
{
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyPaddingRight": 0,
 "id": "window_D9DE153B_A932_5937_41D5_01A3FE18C65A",
 "backgroundColorRatios": [],
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "horizontalAlign": "center",
 "headerBackgroundOpacity": 0,
 "bodyBackgroundColorDirection": "vertical",
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Window236491"
 },
 "bodyBackgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "footerHeight": 5,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "layout": "vertical",
 "titlePaddingLeft": 5,
 "shadowVerticalLength": 0,
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "modal": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "veilColorDirection": "horizontal",
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonPressedIconLineWidth": 3,
 "shadow": true,
 "titlePaddingTop": 5,
 "class": "Window",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "bodyPaddingBottom": 0,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid72633FB1_E932_575F_41E4_2EDDC1224253"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "closeButtonIconColor": "#B2B2B2",
 "closeButtonPressedBackgroundColor": [],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerBorderColor": "#000000",
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [],
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingBottom": 5,
 "closeButtonIconLineWidth": 2,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "paddingTop": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 3.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70C0A1AF_E935_AB43_41D3_388204A49149"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -96.95,
   "backwardYaw": 90.24,
   "distance": 1,
   "panorama": "this.panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 79.04,
   "backwardYaw": 1.41,
   "distance": 1,
   "panorama": "this.panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B",
 "thumbnailUrl": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_t.jpg",
 "label": "IMG_20250717_224156_087",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_B2B86CAE_A756_C0FA_41D5_C21776DF779A",
  "this.overlay_B29E89D3_A756_40AA_41D4_2FDEBAEEADA9"
 ]
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_76847128_EB73_EB4D_41D9_44B8A5B7F9E1",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -49.59,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70D6019E_E935_AB45_41D8_DB9F8457D8A0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73AEF0C9_E935_AACF_41DE_CF52F3ED76B1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 74.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_717C62C0_E935_A93D_41D7_D1AB771BD965"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7203903C_E935_A945_41A1_DAF9ADC3B870"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 4.56,
   "backwardYaw": -104.49,
   "distance": 1,
   "panorama": "this.panorama_ADB65971_A733_C066_41D2_90E2F61C696F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -81.8,
   "backwardYaw": 7.65,
   "distance": 1,
   "panorama": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 94.07,
   "backwardYaw": 89.59,
   "distance": 1,
   "panorama": "this.panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB7C699_A732_40A6_41A1_27020D79BC08",
 "thumbnailUrl": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_t.jpg",
 "label": "Picsart_25-07-29_20-06-59-657",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_B9F6E389_A75E_40A6_41D9_114ECEEE0458",
  "this.overlay_B805B516_A75E_C1AA_41DA_77CD4B1C40B1",
  "this.overlay_B8E310EA_A75D_C07A_41C3_C5BE6963F42B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_72068032_E935_A95D_41E7_CB88BA4DF9E2"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_60B075AE_EF4D_AB45_41BF_68BACEDA46EA",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.77,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_709061D9_E935_AACF_41E2_7E16DD91E307"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 98.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0FED53D0_E935_AEDD_41CD_8D4573AB2C04"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.3,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_707F51FA_E935_AACD_41E0_D70EF6A2E33B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 4.98,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0FD1F3D9_E935_AECF_41DF_DB9D611695C9"
},
{
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyPaddingRight": 0,
 "id": "window_6F0C70FC_EF76_6AC5_41E9_24D8417F650F",
 "backgroundColorRatios": [],
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "horizontalAlign": "center",
 "headerBackgroundOpacity": 0,
 "bodyBackgroundColorDirection": "vertical",
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Window364248"
 },
 "bodyBackgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "footerHeight": 5,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "layout": "vertical",
 "titlePaddingLeft": 5,
 "shadowVerticalLength": 0,
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "modal": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "veilColorDirection": "horizontal",
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonPressedIconLineWidth": 3,
 "shadow": true,
 "titlePaddingTop": 5,
 "class": "Window",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "bodyPaddingBottom": 0,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid727E4FAE_E932_5745_41A4_5CAD46B70B6C"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "closeButtonIconColor": "#B2B2B2",
 "closeButtonPressedBackgroundColor": [],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerBorderColor": "#000000",
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [],
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingBottom": 5,
 "closeButtonIconLineWidth": 2,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "paddingTop": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 95.13,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7367310D_E935_AB47_41E5_5045C38D7AB4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 72.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E715365_E935_AFC7_41DA_937A84916ADF"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.37,
   "backwardYaw": 118.06,
   "distance": 1,
   "panorama": "this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1"
  }
 ],
 "hfov": 180,
 "label": "\u0622\u0645\u0648\u0632\u0634 \u0627\u062f\u06cc\u062a \u0634\u062f\u0647 \u06a9\u0631\u0647",
 "id": "panorama_AD429AA5_A732_40EE_41E2_BAA850034578",
 "thumbnailUrl": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_t.jpg",
 "pitch": 0,
 "partial": true,
 "hfovMax": 146,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_B74E3470_A752_4066_41C0_621660006137"
 ]
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_0FBDA3ED_E935_AEC6_41C2_EAE0DC79741C",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70013257_E935_A9C3_41D7_2B9147E3DBDB"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 95.37,
   "backwardYaw": -84.23,
   "distance": 1,
   "panorama": "this.panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -74.16,
   "backwardYaw": -34.69,
   "distance": 1,
   "panorama": "this.panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3",
 "thumbnailUrl": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_t.jpg",
 "label": "IMG_20250717_224110_023",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_B0AE04A9_A752_40E6_41C0_AA40BAD2F26B",
  "this.overlay_B0A17155_A752_41AE_41D5_8E5270381860"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.02,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0EAA5346_E935_AFC5_41D6_0C538B5911EE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7045221C_E935_A945_41E7_EBDD575BA538"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 26.2,
   "backwardYaw": 1.26,
   "distance": 1,
   "panorama": "this.panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8",
 "thumbnailUrl": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_t.jpg",
 "label": "IMG_20250714_164745_977",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BB19E507_A74E_41AA_41C8_C0555C7E3EC9"
 ]
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_7684F129_EB73_EB4F_41D1_DFD589E0908E",
 "easing": "cubic_in_out"
},
{
 "class": "FadeOutEffect",
 "duration": 500,
 "id": "FadeOutEffect_7F78AA3D_EFCE_B947_41E8_429EF90C3E74",
 "easing": "cubic_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADAB7EF1_A733_C066_4189_28537924BD21_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.56,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7023123E_E935_A945_41E6_A2BAFCCAE8CB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 149.15,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71E9F277_E935_A9C3_41B6_086A41D84ECB"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.61,
   "backwardYaw": -178.32,
   "distance": 1,
   "panorama": "this.panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -94.69,
   "backwardYaw": 179.18,
   "distance": 1,
   "panorama": "this.panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 178.23,
   "backwardYaw": -178.18,
   "distance": 1,
   "panorama": "this.panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1",
 "thumbnailUrl": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_t.jpg",
 "label": "IMG_20250717_224213_300",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_B543C561_A752_C066_41E3_07747D9BF331",
  "this.overlay_B5DD1179_A752_4066_41E4_195AC671C346",
  "this.overlay_B45A2EA9_A752_40E6_41E0_32AD4AB883A9"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -84.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7214E018_E935_A94D_41BE_901577DE187A"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 5.46,
   "backwardYaw": 1.74,
   "distance": 1,
   "panorama": "this.panorama_ADAB7EF1_A733_C066_4189_28537924BD21"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1",
 "thumbnailUrl": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_t.jpg",
 "label": "IMG_20250717_134402_421",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_E752C971_A936_C933_41C8_C42FE17B1790"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 125,
  "class": "PanoramaCameraPosition",
  "yaw": -79.53,
  "pitch": -9.78
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 138,
  "class": "PanoramaCameraPosition",
  "yaw": 179.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 1.55,
    "yawSpeed": 0.81,
    "easing": "cubic_in",
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 19.45,
    "yawSpeed": 0.81,
    "easing": "linear",
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 21,
    "yawSpeed": 0.81,
    "easing": "cubic_out",
    "path": "shortest"
   }
  ]
 },
 "id": "camera_0E9ED351_E935_AFDF_41E4_20E0BC5ED08A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -93.83,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70ED4196_E935_AB45_41C7_0D5BD3C21C10"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB19940_A732_41A6_41CE_69940E32F586_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 126.71,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73B8E0B8_E935_A94D_41E5_D7B666D59162"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7030022D_E935_A947_41DE_2BA98B4D5CDC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 126.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70CAD1B8_E935_AB4D_41D3_51DD2D0FA7D2"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_7684E128_EB73_EB4D_4150_45E370F200B0",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_703A5236_E935_A945_41E3_AB5BEBA3DECE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.74,
   "backwardYaw": 5.46,
   "distance": 1,
   "panorama": "this.panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 91.12,
   "backwardYaw": -94.07,
   "distance": 1,
   "panorama": "this.panorama_AD419A66_A732_C06D_41CD_464B3C602523"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADAB7EF1_A733_C066_4189_28537924BD21",
 "thumbnailUrl": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_t.jpg",
 "label": "IMG_20250717_134420_596",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_E1DED4B7_A932_DF3F_41DC_3B4A5015FF62",
  "this.overlay_E2683135_A933_F932_41C3_779DAC65D954"
 ]
},
{
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyPaddingRight": 0,
 "id": "window_C8E1E17E_A932_592E_41DF_C543B96B7139",
 "backgroundColorRatios": [],
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "horizontalAlign": "center",
 "headerBackgroundOpacity": 0,
 "bodyBackgroundColorDirection": "vertical",
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Window232374"
 },
 "bodyBackgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "footerHeight": 5,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "layout": "vertical",
 "titlePaddingLeft": 5,
 "shadowVerticalLength": 0,
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "modal": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "veilColorDirection": "horizontal",
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonPressedIconLineWidth": 3,
 "shadow": true,
 "titlePaddingTop": 5,
 "class": "Window",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "bodyPaddingBottom": 0,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid72639FAF_E932_5743_41E1_859BA481314F"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "closeButtonIconColor": "#B2B2B2",
 "closeButtonPressedBackgroundColor": [],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerBorderColor": "#000000",
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [],
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingBottom": 5,
 "closeButtonIconLineWidth": 2,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "paddingTop": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E4FF38C_E935_AF45_419E_0D8F73C91BAE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -153.8,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_714AC2E1_E935_AEFF_41E1_4C1A3F01E9ED"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73F6F04D_E935_A9C7_41E9_6E889F612059"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -104.49,
   "backwardYaw": 4.56,
   "distance": 1,
   "panorama": "this.panorama_ADB7C699_A732_40A6_41A1_27020D79BC08"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -175.02,
   "backwardYaw": -81.44,
   "distance": 1,
   "panorama": "this.panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB65971_A733_C066_41D2_90E2F61C696F",
 "thumbnailUrl": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_t.jpg",
 "label": "IMG_20250715_180616_265",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_8305142B_A752_47FA_41C7_069CFB72B250",
  "this.overlay_D4C416F4_A972_FB32_41E1_B8FE51D736EA"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E3C3398_E935_AF4D_41D9_1216532B5D0D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 142,
  "class": "PanoramaCameraPosition",
  "yaw": 179.42,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 1.45,
    "yawSpeed": 0.72,
    "easing": "cubic_in",
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 17.55,
    "yawSpeed": 0.72,
    "easing": "linear",
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 19,
    "yawSpeed": 0.72,
    "easing": "cubic_out",
    "path": "shortest"
   }
  ]
 },
 "id": "camera_700AA25F_E935_A9C3_41AF_38A514668C75"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_732B7160_E935_ABFD_41E9_7BFEE07B35B5"
},
{
 "class": "Video",
 "label": "\u0631\u06cc\u0627\u0633\u062a",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_C91F6128_AB32_B6D1_41E1_A9EECC73AB10_t.jpg",
 "width": 1280,
 "loop": false,
 "id": "video_C91F6128_AB32_B6D1_41E1_A9EECC73AB10",
 "height": 720,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_C91F6128_AB32_B6D1_41E1_A9EECC73AB10.mp4"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 93.33,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_737FB103_E935_AB43_41C3_52C8EB6CD75D"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -94.07,
   "backwardYaw": 91.12,
   "distance": 1,
   "panorama": "this.panorama_ADAB7EF1_A733_C066_4189_28537924BD21"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 94.2,
   "backwardYaw": 85.56,
   "distance": 1,
   "panorama": "this.panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 92.8,
   "backwardYaw": 85.56,
   "distance": 1,
   "panorama": "this.panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD419A66_A732_C06D_41CD_464B3C602523",
 "thumbnailUrl": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_t.jpg",
 "label": "PANO_20250426_092907_3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_E0951118_A8CD_B6F1_41DF_343D67A1711F",
  "this.overlay_E3579744_A8CE_B952_41D5_B222FDAE823B",
  "this.overlay_E371476C_A8CE_F951_41CF_BC1EAC3D02AF",
  "this.overlay_FC637B94_A8D3_C9F1_41D7_AA86BFC5AFEF",
  "this.overlay_FD135799_A8D6_D9F2_41D9_D42720E17098"
 ]
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "VideoPlayListItem",
   "start": "this.viewer_uid727E4FAE_E932_5745_41A4_5CAD46B70B6CVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_0B82BB22_EF72_5F7D_41E8_B5820E279C32, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_0B82BB22_EF72_5F7D_41E8_B5820E279C32, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid727E4FAE_E932_5745_41A4_5CAD46B70B6CVideoPlayer)",
   "media": "this.video_7C629412_EF76_E95D_419B_89533A86B262",
   "player": "this.viewer_uid727E4FAE_E932_5745_41A4_5CAD46B70B6CVideoPlayer"
  }
 ],
 "id": "playList_0B82BB22_EF72_5F7D_41E8_B5820E279C32"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB65971_A733_C066_41D2_90E2F61C696F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 103.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71A7B2A0_E935_A97D_41B3_B51678E14666"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.46,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_713F02E9_E935_AECF_41CE_DF0DC68D1B54"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -30.85,
   "backwardYaw": 3.66,
   "distance": 1,
   "panorama": "this.panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADAF246F_A732_407A_41C1_2383D9E99C42",
 "thumbnailUrl": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_t.jpg",
 "label": "IMG_20250722_213310_983",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BF91BFB8_A74E_C0E6_419C_8D933774EA96"
 ]
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "VideoPlayListItem",
   "start": "this.viewer_uid72639FAF_E932_5743_41E1_859BA481314FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C985B155_A932_5972_41B2_A203618BBD87, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C985B155_A932_5972_41B2_A203618BBD87, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid72639FAF_E932_5743_41E1_859BA481314FVideoPlayer)",
   "media": "this.video_C1901015_A932_56F2_41E0_25230CE485FD",
   "player": "this.viewer_uid72639FAF_E932_5743_41E1_859BA481314FVideoPlayer"
  }
 ],
 "id": "playList_C985B155_A932_5972_41B2_A203618BBD87"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.01,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_706A220B_E935_A943_41BE_792C7D5B1466"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_722E900E_E935_A945_41E3_F81D2597663C"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "75%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 6.04,
 "id": "popup_07172251_EB4F_A9DF_41E3_6ACC2531864E",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "75%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_07172251_EB4F_A9DF_41E3_6ACC2531864E_0_0.jpg",
    "class": "ImageResourceLevel",
    "width": 851,
    "height": 577
   },
   {
    "url": "media/popup_07172251_EB4F_A9DF_41E3_6ACC2531864E_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 512,
    "height": 347
   }
  ]
 },
 "pitch": 6.58,
 "yaw": 6.42,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 164.52,
   "backwardYaw": -11.02,
   "distance": 1,
   "panorama": "this.panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.23,
   "backwardYaw": 11.98,
   "distance": 1,
   "panorama": "this.panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 118.06,
   "backwardYaw": -0.37,
   "distance": 1,
   "panorama": "this.panorama_AD429AA5_A732_40EE_41E2_BAA850034578"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1",
 "thumbnailUrl": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_t.jpg",
 "label": "\u0622\u0645\u0648\u0632\u0634 \u0627\u062f\u06cc\u062a \u0634\u062f\u0647",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_B61FD39F_A755_C0DB_41D7_B599A45D7682",
  "this.overlay_99705FDF_A955_C96F_41D6_4FE8A4DFA4B1",
  "this.overlay_FE92BAB3_A8D7_CB37_41AC_1D7A2559F8A3"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -19.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71BC6298_E935_A94D_41E9_C95B134356D5"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_720A0045_E935_A9C7_41E7_1A488D8103D2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD419A66_A732_C06D_41CD_464B3C602523_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7383B0EA_E935_AACD_41D7_F1FF7337F5C2"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -75.6,
   "backwardYaw": 25.57,
   "distance": 1,
   "panorama": "this.panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_664C4660_E95E_69FD_41D0_4F1548541EF6",
 "thumbnailUrl": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_t.jpg",
 "label": "Picsart_25-08-16_12-38-48-842",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_6A51BBA2_E956_7F7D_41E2_DCD3391E4A58"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_camera"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_0FBE33EE_E935_AEC5_41DB_620C9F86C072",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -160.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7195A2A8_E935_A94D_41DE_CAEC453A83D9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -101.7,
   "backwardYaw": 64.48,
   "distance": 1,
   "panorama": "this.panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D",
 "thumbnailUrl": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_t.jpg",
 "label": "IMG_20250722_004915_644",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_7CDD754B_E8CE_ABC3_41D3_7B2D67D81E2B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 71.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_739DF0D9_E935_AACF_41E0_FAE8C85C2ED1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 90.5,
   "backwardYaw": 5.18,
   "distance": 1,
   "panorama": "this.panorama_ADB0B76A_A732_407A_41E4_8D55B283318E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53",
 "thumbnailUrl": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_t.jpg",
 "label": "Picsart_25-07-29_22-18-22-947",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_EB0BD59C_A94E_59F1_41D3_7DAF46EBD920"
 ]
},
{
 "class": "VideoPlayer",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "displayPlaybackBar": true
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.77,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0EB66335_E935_AF47_41D5_64CDDD0C1CF3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -179.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70F28184_E935_AB45_41D7_F618E52DCAC5"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -15.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E67336E_E935_AFC5_41DF_EA8F86015613"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD411B76_A732_C06A_41E1_E53565184E71_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71FDB267_E935_A9C3_41B5_AFADBCA511CC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 122.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73FD3056_E935_A9C5_41D8_B0BBF91D3BAB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 89.78,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_737180FB_E935_AAC3_41E9_737D2691086C"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "VideoPlayListItem",
   "start": "this.viewer_uid7263EFAF_E932_5743_41C0_08637DA69632VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DCB0DE09_A93D_CAD2_41DE_22891093FF85, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DCB0DE09_A93D_CAD2_41DE_22891093FF85, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid7263EFAF_E932_5743_41C0_08637DA69632VideoPlayer)",
   "media": "this.video_C91F6128_AB32_B6D1_41E1_A9EECC73AB10",
   "player": "this.viewer_uid7263EFAF_E932_5743_41C0_08637DA69632VideoPlayer"
  }
 ],
 "id": "playList_DCB0DE09_A93D_CAD2_41DE_22891093FF85"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73CB10A7_E935_A943_41E7_B4C7D81F309A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73D35082_E935_A93D_41DC_41D6797288CC"
},
{
 "class": "Video",
 "label": "\u0641\u0646\u0627\u0648\u0631\u06cc",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_D6916859_A932_5772_41E1_9349D8627414_t.jpg",
 "width": 1280,
 "loop": false,
 "id": "video_D6916859_A932_5772_41E1_9349D8627414",
 "height": 720,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_D6916859_A932_5772_41E1_9349D8627414.mp4"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.7,
   "backwardYaw": 176.71,
   "distance": 1,
   "panorama": "this.panorama_AD42FA62_A732_406A_41C3_227D74703849"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -176.57,
   "backwardYaw": -1.89,
   "distance": 1,
   "panorama": "this.panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC",
 "thumbnailUrl": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_t.jpg",
 "label": "PANO_20250426_102945_9",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_FDB9EA96_A8DF_CBF1_41C6_C4F0F8B68795",
  "this.overlay_FE6B71AC_A8DE_D9D1_41E2_8D975C124477"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 104.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7199E2B0_E935_A95D_41B0_06F6A40B451C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70FB118D_E935_AB47_41DB_9CBB6E719070"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_739650D1_E935_AADF_41B7_7AEBD0D34738"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "VideoPlayListItem",
   "start": "this.viewer_uid72633FB1_E932_575F_41E4_2EDDC1224253VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C493FDE2_A932_4956_41D5_DE84B2B9224A, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C493FDE2_A932_4956_41D5_DE84B2B9224A, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid72633FB1_E932_575F_41E4_2EDDC1224253VideoPlayer)",
   "media": "this.video_D6916859_A932_5772_41E1_9349D8627414",
   "player": "this.viewer_uid72633FB1_E932_575F_41E4_2EDDC1224253VideoPlayer"
  }
 ],
 "id": "playList_C493FDE2_A932_4956_41D5_DE84B2B9224A"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -75.53,
   "backwardYaw": -84.87,
   "distance": 1,
   "panorama": "this.panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 160.8,
   "backwardYaw": -21.51,
   "distance": 1,
   "panorama": "this.panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 64.48,
   "backwardYaw": -101.7,
   "distance": 1,
   "panorama": "this.panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E",
 "thumbnailUrl": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_t.jpg",
 "label": "IMG_20250722_001724_124",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_ECE43160_A976_F951_4194_BD9704C23438",
  "this.overlay_EC967308_A975_BAD1_41D0_01128D6DCF6C",
  "this.overlay_EDB92332_A973_D931_4183_60A7EC89951B",
  "this.overlay_EFF02860_A97E_B751_41E0_5EC68D51B67E"
 ]
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "VideoPlayListItem",
   "start": "this.viewer_uid72630FB2_E932_575D_41DB_5FCF09801F3CVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_9C3BC3A0_A973_D9D1_41E4_367C242271F3, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_9C3BC3A0_A973_D9D1_41E4_367C242271F3, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid72630FB2_E932_575D_41DB_5FCF09801F3CVideoPlayer)",
   "media": "this.video_9F6088DF_A95F_B76E_41C8_AA74B0D6A419",
   "player": "this.viewer_uid72630FB2_E932_575D_41DB_5FCF09801F3CVideoPlayer"
  }
 ],
 "id": "playList_9C3BC3A0_A973_D9D1_41E4_367C242271F3"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "PANO_20250426_093556_4",
 "id": "panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1",
 "thumbnailUrl": "media/panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73A070C1_E935_A93F_41CB_D6F3A74C88BF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 11.98,
   "backwardYaw": -2.23,
   "distance": 1,
   "panorama": "this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -34.35,
   "backwardYaw": -146.78,
   "distance": 1,
   "panorama": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 179.18,
   "backwardYaw": -94.69,
   "distance": 1,
   "panorama": "this.panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "IMG_20250508_104940_031",
 "id": "panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA",
 "thumbnailUrl": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_B6197C24_A756_47EE_41DE_8CED47B7EEC7",
  "this.overlay_B6B5CD5D_A756_C05F_41B3_33161FE0B46F",
  "this.overlay_BA075CF3_A752_4069_41E4_9A67E59FD8E4"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB19940_A732_41A6_41CE_69940E32F586"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB65971_A733_C066_41D2_90E2F61C696F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.59,
   "backwardYaw": -30.3,
   "distance": 1,
   "panorama": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADB7E26B_A733_C07A_41D0_353E50432948"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085"
  }
 ],
 "hfov": 30,
 "partial": true,
 "id": "panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677",
 "thumbnailUrl": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_t.jpg",
 "label": "Screenshot 2025-08-21 190550",
 "pitch": 0,
 "hfovMax": 74.22,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_t.jpg"
  }
 ],
 "vfov": 53.29,
 "overlays": [
  "this.overlay_00467495_EB72_A947_41D6_5EF8F5524D93",
  "this.overlay_0490135E_EB72_AFC5_41B0_AE396C41B6BE",
  "this.overlay_046648E0_EB75_FAFE_4186_6D90FC2D7832",
  "this.overlay_1701138B_EB76_6F42_41E8_F2830F90480F",
  "this.overlay_050BC98A_EB76_DB4D_41E7_B90DDED462A4",
  "this.overlay_031DC7CB_EB76_D6C3_41E6_FEFF70929223",
  "this.overlay_19EC6505_EB72_EB46_419A_FE64E4899D13"
 ]
},
{
 "class": "Video",
 "label": "\u067e\u0631\u0633\u0646\u0644",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_C1901015_A932_56F2_41E0_25230CE485FD_t.jpg",
 "width": 1280,
 "loop": false,
 "id": "video_C1901015_A932_56F2_41E0_25230CE485FD",
 "height": 720,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_C1901015_A932_56F2_41E0_25230CE485FD.mp4"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 85.93,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0EF4F30B_E935_AF43_41D5_AA4AC944C643"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 25.57,
   "backwardYaw": -75.6,
   "distance": 1,
   "panorama": "this.panorama_664C4660_E95E_69FD_41D0_4F1548541EF6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711",
 "thumbnailUrl": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_t.jpg",
 "label": "Picsart_25-08-11_22-14-18-388",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_6690F6EC_E956_56C5_41E8_ED83C321693C",
  "this.overlay_722122E0_E972_6EFD_41A6_06BC960A8178"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.1,
   "backwardYaw": -4.84,
   "distance": 1,
   "panorama": "this.panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 130.41,
   "backwardYaw": -0.58,
   "distance": 1,
   "panorama": "this.panorama_AD4103F5_A732_C06F_415C_0C084836D4FB"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD411B76_A732_C06A_41E1_E53565184E71",
 "thumbnailUrl": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_t.jpg",
 "label": "IMG_20250721_211129_957",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_96059A93_A94D_CBF7_4192_0057505D3654",
  "this.overlay_9005860F_A94E_7AEF_41C8_FE8DB07A1269"
 ]
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD419A66_A732_C06D_41CD_464B3C602523_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_AD419A66_A732_C06D_41CD_464B3C602523",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_AD42822D_A732_43FE_41E1_58CBC41D4CC1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD42FA62_A732_406A_41C3_227D74703849_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_AD42FA62_A732_406A_41C3_227D74703849",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD429AA5_A732_40EE_41E2_BAA850034578_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_AD429AA5_A732_40EE_41E2_BAA850034578",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB65971_A733_C066_41D2_90E2F61C696F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_ADB65971_A733_C066_41D2_90E2F61C696F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB7E26B_A733_C07A_41D0_353E50432948_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_ADB7E26B_A733_C07A_41D0_353E50432948",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADAB7EF1_A733_C066_4189_28537924BD21_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_ADAB7EF1_A733_C066_4189_28537924BD21",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "media": "this.panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "media": "this.panorama_ADB3D7F0_A732_4066_41D0_840464573FEC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "media": "this.panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "media": "this.panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB215DB_A732_405A_41E3_2A738B528018_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "media": "this.panorama_ADB215DB_A732_405A_41E3_2A738B528018",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "media": "this.panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB24E65_A732_406E_41C7_08796165960B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "media": "this.panorama_ADB24E65_A732_406E_41C7_08796165960B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "media": "this.panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "media": "this.panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "media": "this.panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "media": "this.panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD411B76_A732_C06A_41E1_E53565184E71_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "media": "this.panorama_AD411B76_A732_C06A_41E1_E53565184E71",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "media": "this.panorama_AD4103F5_A732_C06F_415C_0C084836D4FB",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "media": "this.panorama_AD414B66_A732_C06A_41C3_15520ACE14D1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "media": "this.panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "media": "this.panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "media": "this.panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "media": "this.panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "media": "this.panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "media": "this.panorama_ADB0B76A_A732_407A_41E4_8D55B283318E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "media": "this.panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "media": "this.panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "media": "this.panorama_ADAF246F_A732_407A_41C1_2383D9E99C42",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB19940_A732_41A6_41CE_69940E32F586_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "media": "this.panorama_ADB19940_A732_41A6_41CE_69940E32F586",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "media": "this.panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "media": "this.panorama_ADB7C699_A732_40A6_41A1_27020D79BC08",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "media": "this.panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "media": "this.panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "media": "this.panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "media": "this.panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "media": "this.panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "VideoPlayListItem",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 58, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 58)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "media": "this.video_9F6088DF_A95F_B76E_41C8_AA74B0D6A419",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "media": "this.panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "VideoPlayListItem",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 60, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 60)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "media": "this.video_C91F6128_AB32_B6D1_41E1_A9EECC73AB10",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "class": "VideoPlayListItem",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 61, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 61)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 61, 62)",
   "media": "this.video_C1901015_A932_56F2_41E0_25230CE485FD",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "class": "VideoPlayListItem",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 62, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 62)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 62, 63)",
   "media": "this.video_D6916859_A932_5772_41E1_9349D8627414",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 63, 64)",
   "media": "this.panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 64, 65)",
   "media": "this.panorama_664C4660_E95E_69FD_41D0_4F1548541EF6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "VideoPlayListItem",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 65, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 65)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 65, 66)",
   "media": "this.video_70071F1D_E9D5_D747_41E2_49B9BE83ABEF",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "class": "VideoPlayListItem",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 66, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 66)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 66, 67)",
   "media": "this.video_7C629412_EF76_E95D_419B_89533A86B262",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07, true, -1, this.effect_60B005AE_EF4D_AB45_41DC_B892203665B7, 'showEffect', false); if(this.existsKey('visibility_Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51')){ if(this.getKey('visibility_Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51')) { this.setComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, true, -1, this.effect_0FBDA3ED_E935_AEC6_41C2_EAE0DC79741C, 'showEffect', false); } else { this.setComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, false, -1, this.effect_60B025AF_EF4D_AB43_41E2_EEB046A92594, 'hideEffect', false); } }; this.unregisterKey('visibility_Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51'); this.setComponentVisibility(this.Image_934ED513_A952_BEF7_41E0_E26023E43F55, true, -1, this.effect_60B085B1_EF4D_AB5F_41E7_5721D58EA6FB, 'showEffect', false)",
   "camera": "this.panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_camera",
   "begin": "this.registerKey('visibility_Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51', this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51.get('visible')); this.setEndToItemIndex(this.mainPlayList, 67, 68); this.keepComponentVisibility(this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07, false); this.setComponentVisibility(this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07, false, -1, this.effect_60B075AE_EF4D_AB45_41BF_68BACEDA46EA, 'hideEffect', false); this.keepComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, false); this.setComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, false, -1, this.effect_60B025AF_EF4D_AB43_41E2_EEB046A92594, 'hideEffect', false); this.keepComponentVisibility(this.Image_934ED513_A952_BEF7_41E0_E26023E43F55, false); this.setComponentVisibility(this.Image_934ED513_A952_BEF7_41E0_E26023E43F55, false, -1, this.effect_60B0F5B1_EF4D_AB5F_41C8_E841927F7911, 'hideEffect', false)",
   "media": "this.panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07, true); this.keepComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, true); this.keepComponentVisibility(this.Image_934ED513_A952_BEF7_41E0_E26023E43F55, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 68, 69)",
   "media": "this.panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07, true, -1, this.effect_76845128_EB73_EB4D_41E4_184DF12C6FCA, 'showEffect', false); if(this.existsKey('visibility_Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51')){ if(this.getKey('visibility_Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51')) { this.setComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, true, -1, this.effect_0FBE33EE_E935_AEC5_41DB_620C9F86C072, 'showEffect', false); } else { this.setComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, false, -1, this.effect_76849128_EB73_EB4D_41C5_6781D717861C, 'hideEffect', false); } }; this.unregisterKey('visibility_Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51'); this.setComponentVisibility(this.Image_934ED513_A952_BEF7_41E0_E26023E43F55, true, -1, this.effect_7684F129_EB73_EB4F_41D1_DFD589E0908E, 'showEffect', false); this.trigger('tourEnded')",
   "camera": "this.panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_camera",
   "begin": "this.registerKey('visibility_Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51', this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51.get('visible')); this.setEndToItemIndex(this.mainPlayList, 69, 0); this.keepComponentVisibility(this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07, false); this.setComponentVisibility(this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07, false, -1, this.effect_76847128_EB73_EB4D_41D9_44B8A5B7F9E1, 'hideEffect', false); this.keepComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, false); this.setComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, false, -1, this.effect_7684A128_EB73_EB4D_41E6_D4230BC646BB, 'hideEffect', false); this.keepComponentVisibility(this.Image_934ED513_A952_BEF7_41E0_E26023E43F55, false); this.setComponentVisibility(this.Image_934ED513_A952_BEF7_41E0_E26023E43F55, false, -1, this.effect_7684E128_EB73_EB4D_4150_45E370F200B0, 'hideEffect', false)",
   "media": "this.panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07, true); this.keepComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, true); this.keepComponentVisibility(this.Image_934ED513_A952_BEF7_41E0_E26023E43F55, true)"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.12,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_718FD2B8_E935_A94D_41DE_FD787FB62500"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -100.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0EC1F32C_E935_AF45_41CF_77ADEA16B4CC"
},
{
 "class": "FadeInEffect",
 "duration": 800,
 "id": "FadeInEffect_7F768A3C_EFCE_B945_41D7_BA2E07D6B46E",
 "easing": "cubic_in"
},
{
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyPaddingRight": 0,
 "id": "window_CD7F7519_A972_5EF2_41C8_5E810CD2C96C",
 "backgroundColorRatios": [],
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "horizontalAlign": "center",
 "headerBackgroundOpacity": 0,
 "bodyBackgroundColorDirection": "vertical",
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Window226229"
 },
 "bodyBackgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "footerHeight": 5,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "layout": "vertical",
 "titlePaddingLeft": 5,
 "shadowVerticalLength": 0,
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "modal": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "veilColorDirection": "horizontal",
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonPressedIconLineWidth": 3,
 "shadow": true,
 "titlePaddingTop": 5,
 "class": "Window",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "bodyPaddingBottom": 0,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid7263EFAF_E932_5743_41C0_08637DA69632"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "closeButtonIconColor": "#B2B2B2",
 "closeButtonPressedBackgroundColor": [],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerBorderColor": "#000000",
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [],
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingBottom": 5,
 "closeButtonIconLineWidth": 2,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "paddingTop": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -105.66,
   "backwardYaw": 2.61,
   "distance": 1,
   "panorama": "this.panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 88.37,
   "backwardYaw": 3.36,
   "distance": 1,
   "panorama": "this.panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481",
 "thumbnailUrl": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_t.jpg",
 "label": "IMG_20250722_210218_643",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_EF4B0680_A975_BBD2_41AE_F408EF30EF2A",
  "this.overlay_E85B188D_A975_B7D2_41DB_E00AA9C1E8DC"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.51,
   "backwardYaw": 1.81,
   "distance": 1,
   "panorama": "this.panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC",
 "thumbnailUrl": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_t.jpg",
 "label": "Picsart_25-07-15_17-06-59-522_LE_upscale_balanced_x4",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_CD5CA12E_ABD6_B92E_41AC_10F71BD5DE5B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_716272C8_E935_AECD_41C6_B2ABBC060C20"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -19.25,
   "backwardYaw": 27.97,
   "distance": 1,
   "panorama": "this.panorama_AD414B66_A732_C06A_41C3_15520ACE14D1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 79.98,
   "backwardYaw": 94.6,
   "distance": 1,
   "panorama": "this.panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB215DB_A732_405A_41E3_2A738B528018",
 "thumbnailUrl": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_t.jpg",
 "label": "IMG_20250718_224949_603",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_F7BE2BF9_A8F2_4933_41D0_937C1C02C7DD",
  "this.overlay_F1B6D88F_A8F6_57EF_4169_500B85236366"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.65,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73CD209D_E935_A947_41DF_4D94D005315E"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -93.24,
   "backwardYaw": 95.03,
   "distance": 1,
   "panorama": "this.panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 92.4,
   "backwardYaw": 175.13,
   "distance": 1,
   "panorama": "this.panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306",
 "thumbnailUrl": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_t.jpg",
 "label": "IMG_20250720_115048_019",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_918F5FAD_A94E_49D3_41E1_5A40B909C21E",
  "this.overlay_EC4354FC_A972_7F31_41CC_D29B2F6C3141"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -53.29,
   "backwardYaw": -171.21,
   "distance": 1,
   "panorama": "this.panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB3D7F0_A732_4066_41D0_840464573FEC",
 "thumbnailUrl": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_t.jpg",
 "label": "IMG_20250717_234352_116",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_F6F9F78F_A8F6_59EF_41D3_F33A2A1E9C36"
 ]
},
{
 "class": "FadeOutEffect",
 "duration": 500,
 "id": "effect_2CA3D96E_EBFE_BBC2_41E4_9FB80637BD50",
 "easing": "linear"
},
{
 "class": "FadeInEffect",
 "duration": 700,
 "id": "effect_76B7CFD8_EBD6_56CE_41BB_7B0601763FC6",
 "easing": "linear"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -84.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_72388FF4_E932_56C5_41D9_DEDF827F2676"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB215DB_A732_405A_41E3_2A738B528018_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_camera",
 "initialPosition": {
  "hfov": 74,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 145.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E0AC3BD_E935_AF47_41C4_B6157D42400F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -108.93,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7218402A_E935_A94D_41C2_E0A9174C9B0C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_715022D0_E935_AEDD_41DE_884015871E22"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.58,
   "backwardYaw": 130.41,
   "distance": 1,
   "panorama": "this.panorama_AD411B76_A732_C06A_41E1_E53565184E71"
  }
 ],
 "hfov": 180,
 "label": "\u0648\u0631\u0648\u062f\u06cc",
 "id": "panorama_AD4103F5_A732_C06F_415C_0C084836D4FB",
 "thumbnailUrl": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_t.jpg",
 "pitch": 0,
 "partial": true,
 "hfovMax": 142,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_96B2FF3B_A952_4937_41D4_7D6735D0CCE6"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -84.87,
   "backwardYaw": -75.53,
   "distance": 1,
   "panorama": "this.panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 178.35,
   "backwardYaw": -3.88,
   "distance": 1,
   "panorama": "this.panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 2.61,
   "backwardYaw": -105.66,
   "distance": 1,
   "panorama": "this.panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B",
 "thumbnailUrl": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_t.jpg",
 "label": "IMG_20250720_114605_451",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_937E503F_A972_572F_41E0_F46FA42B1242",
  "this.overlay_ECDF7FDB_A976_4977_41B9_D24817AACCE8",
  "this.overlay_D6D761A4_A9F2_D9D1_41DA_72AA051B3DAB"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 156.33,
   "backwardYaw": 5.04,
   "distance": 1,
   "panorama": "this.panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB19940_A732_41A6_41CE_69940E32F586",
 "thumbnailUrl": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_t.jpg",
 "label": "Picsart_25-07-28_15-53-06-795",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_26CEBBFB_A8F6_4936_41C0_06B312088BC9"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_738420E2_E935_AAFD_41B3_478A32BA27D3"
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_6FFFF979_E732_5BCF_41E4_59114F01BDDC.mp3",
  "oggUrl": "media/audio_6FFFF979_E732_5BCF_41E4_59114F01BDDC.ogg"
 },
 "autoplay": true,
 "id": "audio_6FFFF979_E732_5BCF_41E4_59114F01BDDC",
 "data": {
  "label": "omar_akram_-_love_of_my_heart"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -129.58,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70150246_E935_A9C5_41E0_139970A368AB"
},
{
 "class": "FadeInEffect",
 "duration": 500,
 "id": "FadeInEffect_7F789A3D_EFCE_B947_41E5_8165DF47ACE5",
 "easing": "cubic_in"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.11,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0FB453E9_E935_AECF_41E8_6508E1F5751F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 74,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -115.52,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71C9428F_E935_A943_41B2_7CBDFDE8A167"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 85.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_708301EA_E935_AACD_41E6_F23316CFA9F5"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 70.81,
   "backwardYaw": 50.42,
   "distance": 1,
   "panorama": "this.panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 179.52,
   "backwardYaw": -0.45,
   "distance": 1,
   "panorama": "this.panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A",
 "thumbnailUrl": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_t.jpg",
 "label": "IMG_20250509_004201_375",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_8A05BD7F_A73E_405B_41DA_6E9F6279CEF8",
  "this.overlay_8A0A8415_A73D_C7AE_41E2_2BB071AD8D26",
  "this.overlay_898F0848_A7D2_CFA6_41D2_FFE58737F85B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 52.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71DCD27F_E935_A9C3_41BD_38EE7FFD8980"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73364143_E935_ABC3_41DC_D66AD8AFF644"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282"
  }
 ],
 "hfov": 30,
 "partial": true,
 "id": "panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223",
 "thumbnailUrl": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_t.jpg",
 "label": "Screenshot 2025-08-21 190434",
 "pitch": 0,
 "hfovMax": 74.32,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_t.jpg"
  }
 ],
 "vfov": 53.38,
 "overlays": [
  "this.overlay_04FB77CE_EB5E_76C5_41D1_6B982E7C2F6F",
  "this.overlay_711AF87A_EB5F_F9CD_41A3_D16E4907805F",
  "this.popup_07172251_EB4F_A9DF_41E3_6ACC2531864E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E6BE378_E935_AFCD_41D1_89FC7CA0978A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 81.64,
   "backwardYaw": -58.1,
   "distance": 1,
   "panorama": "this.panorama_AD414B66_A732_C06A_41C3_15520ACE14D1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -76.91,
   "backwardYaw": -108.82,
   "distance": 1,
   "panorama": "this.panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B",
 "thumbnailUrl": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_t.jpg",
 "label": "Picsart_25-07-18_00-26-03-959",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_F9D95A81_A8F2_CBD3_41DB_871436A6C7C9",
  "this.overlay_FAE6FCB6_A8F3_CF3B_41DF_9C7521178186"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 95.77,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E04B3B4_E935_AF45_41DA_90752D3BADBE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 168.98,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0EA4533D_E935_AF47_41E1_0CBEBD85A368"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -95.99,
   "backwardYaw": 178.82,
   "distance": 1,
   "panorama": "this.panorama_ADB0B76A_A732_407A_41E4_8D55B283318E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 3.36,
   "backwardYaw": 88.37,
   "distance": 1,
   "panorama": "this.panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984",
 "thumbnailUrl": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_t.jpg",
 "label": "IMG_20250722_195116_985",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_E9F51570_A972_D931_41DD_3381C5F12A93",
  "this.overlay_E991B4E9_A972_7F53_41D9_3D5EBDEAB350"
 ]
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_60B0F5B1_EF4D_AB5F_41C8_E841927F7911",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 5.04,
   "backwardYaw": 156.33,
   "distance": 1,
   "panorama": "this.panorama_ADB19940_A732_41A6_41CE_69940E32F586"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 88.99,
   "backwardYaw": -83.08,
   "distance": 1,
   "panorama": "this.panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -83.91,
   "backwardYaw": -178.52,
   "distance": 1,
   "panorama": "this.panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F",
 "thumbnailUrl": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_t.jpg",
 "label": "IMG_20250722_175712_736",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_8D657361_A737_C066_41D2_2A2E0F6B0C71",
  "this.overlay_897C5471_A736_C066_418D_DD8BC82F5FE1",
  "this.overlay_8C37253B_A732_41DA_419D_E9E792DBCFAE"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0EF9A313_E935_AF43_41E9_388992F33078"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_60B005AE_EF4D_AB45_41DC_B892203665B7",
 "easing": "cubic_in_out"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_60B085B1_EF4D_AB5F_41E7_5721D58EA6FB",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB7E26B_A733_C07A_41D0_353E50432948_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_camera"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_76849128_EB73_EB4D_41C5_6781D717861C",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.41,
   "backwardYaw": 79.04,
   "distance": 1,
   "panorama": "this.panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -178.18,
   "backwardYaw": 178.23,
   "distance": 1,
   "panorama": "this.panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B",
 "thumbnailUrl": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_t.jpg",
 "label": "Picsart_25-07-17_13-09-01-084",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_B3DFD0B8_A753_C0E5_41C2_CBCBD1AD468A",
  "this.overlay_B28A8CE5_A752_406E_41D5_0F9CD26E0716"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -108.82,
   "backwardYaw": -76.91,
   "distance": 1,
   "panorama": "this.panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 152,
   "backwardYaw": 19.46,
   "distance": 1,
   "panorama": "this.panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6",
 "thumbnailUrl": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_t.jpg",
 "label": "IMG_20250717_233514_497",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_F8ECE268_A8F2_5B51_41B5_18F17DD74DFB",
  "this.overlay_F577D3FD_A8F2_7932_41C6_3B5D340F0722"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -88.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70BD01C0_E935_AB3D_41B9_24E5790836E0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -152.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E2283A2_E935_AF7D_41C7_07AD42848CD2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_camera"
},
{
 "class": "FadeOutEffect",
 "duration": 800,
 "id": "FadeOutEffect_7F76AA3C_EFCE_B945_41E3_0019C05708EA",
 "easing": "cubic_out"
},
{
 "class": "Video",
 "label": "\u06af\u0631\u0648\u0647 \u067e\u0631\u0633\u062a\u0627\u0631\u06cc",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_70071F1D_E9D5_D747_41E2_49B9BE83ABEF_t.jpg",
 "width": 1920,
 "loop": false,
 "id": "video_70071F1D_E9D5_D747_41E2_49B9BE83ABEF",
 "height": 1080,
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_70071F1D_E9D5_D747_41E2_49B9BE83ABEF.mp4"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_736EB115_E935_AB47_41CB_3F944CBF1999"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 96.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73226158_E935_ABCD_41AD_E903AF8124C6"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -3.88,
   "backwardYaw": 178.35,
   "distance": 1,
   "panorama": "this.panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 95.03,
   "backwardYaw": -93.24,
   "distance": 1,
   "panorama": "this.panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3",
 "thumbnailUrl": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_t.jpg",
 "label": "IMG_20250720_203620_034",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_93C580E1_A972_7753_41E3_F4473C943CCC",
  "this.overlay_ED8C65DD_A973_D973_41D2_6729520492EB"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -61.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73B2F0B0_E935_A95D_41B8_B89D403179BB"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -107.11,
   "backwardYaw": 93.45,
   "distance": 1,
   "panorama": "this.panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.71,
   "backwardYaw": 1.7,
   "distance": 1,
   "panorama": "this.panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD42FA62_A732_406A_41C3_227D74703849",
 "thumbnailUrl": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_t.jpg",
 "label": "PANO_20250426_100532_2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_FA9AC3E5_A8D2_5952_41DC_DDA977A43562",
  "this.overlay_F63FD293_A8D2_7BF7_41E1_4D20B2AE32D1"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 142,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 1.45,
    "yawSpeed": 0.72,
    "easing": "cubic_in",
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 17.55,
    "yawSpeed": 0.72,
    "easing": "linear",
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 19,
    "yawSpeed": 0.72,
    "easing": "cubic_out",
    "path": "shortest"
   }
  ]
 },
 "id": "panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_camera"
},
{
 "class": "Video",
 "label": "\u0628\u0647\u062f\u0627\u0634\u062a",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_9F6088DF_A95F_B76E_41C8_AA74B0D6A419_t.jpg",
 "width": 1280,
 "loop": false,
 "id": "video_9F6088DF_A95F_B76E_41C8_AA74B0D6A419",
 "height": 720,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9F6088DF_A95F_B76E_41C8_AA74B0D6A419.mp4"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_camera",
 "initialPosition": {
  "hfov": 74,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 90.24,
   "backwardYaw": -96.95,
   "distance": 1,
   "panorama": "this.panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -84.23,
   "backwardYaw": 95.37,
   "distance": 1,
   "panorama": "this.panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38",
 "thumbnailUrl": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_t.jpg",
 "label": "IMG_20250717_224141_149",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_B076B9FB_A756_405A_41BB_FF44CF1AC6C3",
  "this.overlay_B197F04B_A756_7FBA_419D_58330F0CA5A0"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.79,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7211B021_E935_A97F_41E6_66D7F239E41E"
},
{
 "class": "ImageResource",
 "id": "ImageResource_7AA2CD05_EB73_DB47_41E4_D0F589A9D591",
 "levels": [
  {
   "url": "media/popup_0B767245_EB4E_A9C7_41E7_FA9EC1FACAE1_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1126,
   "height": 782
  },
  {
   "url": "media/popup_0B767245_EB4E_A9C7_41E7_FA9EC1FACAE1_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 711
  },
  {
   "url": "media/popup_0B767245_EB4E_A9C7_41E7_FA9EC1FACAE1_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 355
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 75.51,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73E0C068_E935_A9CD_41D2_00CF1DD6B7B2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_camera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_7F788A3D_EFCE_B947_41D0_33D9B9024858",
 "levels": [
  {
   "url": "media/zoomImage_7F1C1495_EFCE_E947_41E1_A8B2218713A6_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 861,
   "height": 1080
  },
  {
   "url": "media/zoomImage_7F1C1495_EFCE_E947_41E1_A8B2218713A6_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 816,
   "height": 1024
  },
  {
   "url": "media/zoomImage_7F1C1495_EFCE_E947_41E1_A8B2218713A6_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 408,
   "height": 512
  }
 ]
},
{
 "class": "FadeInEffect",
 "duration": 500,
 "id": "effect_2CA3A96E_EBFE_BBC2_41B4_93FEC75E62C9",
 "easing": "linear"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73FA505F_E935_A9C3_41E2_32AC2908D4B6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0FC7A3E1_E935_AEFF_41D5_CA727F9E7C57"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -81.57,
   "backwardYaw": 71.07,
   "distance": 1,
   "panorama": "this.panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -170.18,
   "backwardYaw": -0.66,
   "distance": 1,
   "panorama": "this.panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB7E26B_A733_C07A_41D0_353E50432948",
 "thumbnailUrl": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_t.jpg",
 "label": "Picsart_25-07-15_19-03-02-151",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_858E08D0_A755_C0A6_41E4_28AAFF9892F9",
  "this.overlay_844528E8_A752_C066_41C5_877EEA24464D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 145.65,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73D8308B_E935_A943_41CA_667E303B9AE4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 105.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_735C8127_E935_AB43_41E0_48F4A8189F4D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 74,
  "class": "PanoramaCameraPosition",
  "yaw": 179.41,
  "pitch": 0
 },
 "id": "camera_73C6C094_E935_A945_41A0_691D1333EFFC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AD42FA62_A732_406A_41C3_227D74703849_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 89.59,
   "backwardYaw": 94.07,
   "distance": 1,
   "panorama": "this.panorama_ADB7C699_A732_40A6_41A1_27020D79BC08"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.92,
   "backwardYaw": -179.67,
   "distance": 1,
   "panorama": "this.panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -86.67,
   "backwardYaw": -93.38,
   "distance": 1,
   "panorama": "this.panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56",
 "thumbnailUrl": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_t.jpg",
 "label": "Picsart_25-07-29_21-18-18-121",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_873FBE22_A752_43EA_41D3_57C44A08F2CC",
  "this.overlay_853C5893_A752_40AA_41C0_952C03843431",
  "this.overlay_8646DC8B_A752_40BA_41E2_DD8EDB752313"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_734DB13A_E935_AB4D_41D1_6E02F442E091"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -4.84,
   "backwardYaw": 0.1,
   "distance": 1,
   "panorama": "this.panorama_AD411B76_A732_C06A_41E1_E53565184E71"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 175.13,
   "backwardYaw": 92.4,
   "distance": 1,
   "panorama": "this.panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4",
 "thumbnailUrl": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_t.jpg",
 "label": "IMG_20250720_114747_720",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_973A4C53_A94F_CF77_41E0_CEF9DF3A091B",
  "this.overlay_930792FB_A94E_BB37_4182_DECB665FCD76"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.93,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_731D6169_E935_ABCF_41D8_4EC23538731C"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 93.45,
   "backwardYaw": -107.11,
   "distance": 1,
   "panorama": "this.panorama_AD42FA62_A732_406A_41C3_227D74703849"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -11.02,
   "backwardYaw": 164.52,
   "distance": 1,
   "panorama": "this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1"
  }
 ],
 "hfov": 360,
 "label": "IMG_20250515_203919_169",
 "id": "panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B",
 "thumbnailUrl": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 6,
      "tags": "ondemand",
      "colCount": 6,
      "width": 3072,
      "height": 3072
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "120%",
 "overlays": [
  "this.overlay_FE679FCF_A8D6_496F_41E2_3A8FAEAC7826",
  "this.overlay_FBF65150_A8D6_B971_41DF_66808F215FBF"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -57.75,
   "backwardYaw": -53.37,
   "distance": 1,
   "panorama": "this.panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB24E65_A732_406E_41C7_08796165960B",
 "thumbnailUrl": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_t.jpg",
 "label": "IMG_20250719_150313_637",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_D9BCD6D1_A936_DB72_41C0_037574F4608B"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.26,
   "backwardYaw": 26.2,
   "distance": 1,
   "panorama": "this.panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -127.46,
   "backwardYaw": 138.54,
   "distance": 1,
   "panorama": "this.panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD",
 "thumbnailUrl": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_t.jpg",
 "label": "Picsart_25-07-30_00-13-07-127",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BDF78559_A772_C1A6_41DA_1E91C481F69C",
  "this.overlay_D5EFAD6F_A952_492F_41A9_D36380E99013"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 138,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 1.55,
    "yawSpeed": 0.81,
    "easing": "cubic_in",
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 19.45,
    "yawSpeed": 0.81,
    "easing": "linear",
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 21,
    "yawSpeed": 0.81,
    "easing": "cubic_out",
    "path": "shortest"
   }
  ]
 },
 "id": "panorama_AD429AA5_A732_40EE_41E2_BAA850034578_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -4.87,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_723C6FFD_E932_56C7_41AE_1233AA5CD816"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 105.84,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_71C65287_E935_A943_41D0_6F2F1F7E2182"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 9.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7389C0F2_E935_AADD_41D9_6228F2CA1452"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.45,
   "backwardYaw": 179.52,
   "distance": 1,
   "panorama": "this.panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -178.52,
   "backwardYaw": -83.91,
   "distance": 1,
   "panorama": "this.panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8",
 "thumbnailUrl": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_t.jpg",
 "label": "IMG_20250509_002709_998",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_8BD95FD0_A73D_C0A6_41DE_3709BABD1802",
  "this.overlay_8A0E01AB_A73E_C0FA_41C0_AAAD12EFF8D4"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 50.42,
   "backwardYaw": 70.81,
   "distance": 1,
   "panorama": "this.panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085",
 "thumbnailUrl": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_t.jpg",
 "label": "IMG_20250719_143836_905",
 "pitch": 0,
 "hfovMax": 140,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D24B1504_A8CD_DED1_41E4_FAE152E6B4EE"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.26,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7052E214_E935_A945_41E5_95EA5E720998"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -81.92,
   "backwardYaw": -74.71,
   "distance": 1,
   "panorama": "this.panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 94.6,
   "backwardYaw": 79.98,
   "distance": 1,
   "panorama": "this.panorama_ADB215DB_A732_405A_41E3_2A738B528018"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "IMG_20250718_223345_068",
 "id": "panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC",
 "thumbnailUrl": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_3AF1C74F_B8CE_F96E_41B7_64E3CD556779",
  "this.overlay_36EFDA02_B8F2_4AD1_41D7_BA4ACE402451"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -94.17,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_70601202_E935_A93D_4193_267907966B9B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_73D49079_E935_A9CF_41D1_937A33A34193"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.81,
   "backwardYaw": 0.51,
   "distance": 1,
   "panorama": "this.panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 85.83,
   "backwardYaw": -177.94,
   "distance": 1,
   "panorama": "this.panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -90.22,
   "backwardYaw": 86.17,
   "distance": 1,
   "panorama": "this.panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B",
 "thumbnailUrl": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_t.jpg",
 "label": "Picsart_25-07-29_20-40-23-172",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_81AA03B6_A732_40EA_41E4_1DB3717C11FE",
  "this.overlay_8C49F063_A732_4069_41DF_3BE464A55823",
  "this.overlay_C63FFE96_ABD6_4BF1_41E2_CD64CEF8C15A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 78.3,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7355111E_E935_AB45_41CB_7D2B12C09961"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB24E65_A732_406E_41C7_08796165960B_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.66,
   "backwardYaw": -170.18,
   "distance": 1,
   "panorama": "this.panorama_ADB7E26B_A733_C07A_41D0_353E50432948"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 86.17,
   "backwardYaw": -90.22,
   "distance": 1,
   "panorama": "this.panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -93.38,
   "backwardYaw": -86.67,
   "distance": 1,
   "panorama": "this.panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B",
 "thumbnailUrl": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_t.jpg",
 "label": "Picsart_25-07-29_21-48-11-433",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_86D03002_A756_BFAA_41D8_FDB56BA73BC4",
  "this.overlay_8471269D_A756_40DE_41DD_7476D0ED307F",
  "this.overlay_8216C550_A74E_C1A6_41D8_97111C9BA248"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_711142FA_E935_AECD_41D4_7E268E073361"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -21.51,
   "backwardYaw": 160.8,
   "distance": 1,
   "panorama": "this.panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1",
 "thumbnailUrl": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_t.jpg",
 "label": "IMG_20250722_173712_806",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_EE22B7BC_A972_B931_41CA_BCB97C6ED149"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_701E924F_E935_A9C3_41E5_131B0D336566"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -26.75,
  "pitch": -19.92
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0EEF431B_E935_AF43_41C1_876A1667CC1E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -98.36,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_712CC2F1_E935_AEDF_41E3_68F2F74402EB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_camera"
},
{
 "class": "Video",
 "label": "\u062f\u0631\u0628\u0627\u0631\u0647",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_7C629412_EF76_E95D_419B_89533A86B262_t.jpg",
 "width": 1280,
 "loop": false,
 "id": "video_7C629412_EF76_E95D_419B_89533A86B262",
 "height": 720,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_7C629412_EF76_E95D_419B_89533A86B262.mp4"
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_7F76FA3C_EFCE_B945_41D7_8A4D949E1FCE",
 "levels": [
  {
   "url": "media/zoomImage_722C3DAD_EFF2_7B47_41CF_279D717B384F_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 606,
   "height": 1075
  },
  {
   "url": "media/zoomImage_722C3DAD_EFF2_7B47_41CF_279D717B384F_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 577,
   "height": 1024
  },
  {
   "url": "media/zoomImage_722C3DAD_EFF2_7B47_41CF_279D717B384F_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 288,
   "height": 512
  }
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -177.94,
   "backwardYaw": 85.83,
   "distance": 1,
   "panorama": "this.panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -83.08,
   "backwardYaw": 88.99,
   "distance": 1,
   "panorama": "this.panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "IMG_20250509_002019_808",
 "id": "panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834",
 "thumbnailUrl": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_8F6A128F_A736_40BA_41CF_2DB53001E39C",
  "this.overlay_8B39628C_A736_C0BE_41C5_37DFFFC2447C"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 84.01,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0EDC0324_E935_AF45_41C2_DDDF86BABC83"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 149.7,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_7221C006_E935_A945_41DA_D6E2F76B0F85"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "85%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 9.31,
 "id": "popup_0B767245_EB4E_A9C7_41E7_FA9EC1FACAE1",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "85%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_0B767245_EB4E_A9C7_41E7_FA9EC1FACAE1_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 711
   }
  ]
 },
 "pitch": -12.46,
 "yaw": -6.08,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.59,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_0E59C381_E935_AF3F_41E4_6C1A0EB2CBB8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -100.02,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_735BD131_E935_AB5F_41E4_0B9D478F9247"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 33.22,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_709A81E1_E935_AAFF_41E7_ADB46A14B354"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323000
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_camera"
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "toolTipPaddingTop": 4
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_9E6CE30B_A972_7AD7_41D9_0DE16689568A",
 "left": "0.07%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "children": [
  "this.Container_9E6FD30A_A972_7AD1_41CD_FD66B0C5486F"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 115.05,
 "horizontalAlign": "left",
 "minHeight": 1,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": 641,
 "gap": 10,
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--SETTINGS"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51",
 "left": "0.07%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "width": 173.2,
 "children": [
  "this.IconButton_785DE200_E93E_693D_41E3_EC7EE166D5EA",
  "this.IconButton_9E6C430B_A972_7AD7_41DE_3B98CF505A75",
  "this.IconButton_9E6C530B_A972_7AD7_41D2_A19660489CAD",
  "this.IconButton_9E6C230B_A972_7AD7_41AB_6D8E50438A1B",
  "this.IconButton_9E6F930B_A972_7AD7_41C6_A8464D4FEEA4",
  "this.IconButton_9351589C_A937_B7F1_41DB_55CD4F143408",
  "this.IconButton_9E6C130B_A972_7AD7_41D8_6C2301FA4627"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": "88.097%",
 "scrollBarOpacity": 0.5,
 "gap": 3,
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "class": "Container",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "-button set"
 }
},
{
 "maxHeight": 270,
 "propagateClick": false,
 "id": "Image_934ED513_A952_BEF7_41E0_E26023E43F55",
 "paddingRight": 0,
 "right": "0.02%",
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_934ED513_A952_BEF7_41E0_E26023E43F55.png",
 "width": 129.25,
 "minHeight": 1,
 "paddingTop": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "click": "if(!this.Container_98C41731_A952_B932_41B9_D5783E3A5F9C.get('visible')){ this.setComponentVisibility(this.Container_98C41731_A952_B932_41B9_D5783E3A5F9C, true, 0, this.effect_2CA3A96E_EBFE_BBC2_41B4_93FEC75E62C9, 'showEffect', false) } else { this.setComponentVisibility(this.Container_98C41731_A952_B932_41B9_D5783E3A5F9C, false, 0, this.effect_2CA3D96E_EBFE_BBC2_41E4_9FB80637BD50, 'hideEffect', false) }",
 "horizontalAlign": "center",
 "height": 88,
 "top": "0.08%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "class": "Image",
 "scaleMode": "fill",
 "borderRadius": 0,
 "maxWidth": 425,
 "data": {
  "name": "Image114718"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_98C41731_A952_B932_41B9_D5783E3A5F9C",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0.06%",
 "paddingLeft": 0,
 "children": [
  "this.IconButton_98C59732_A952_B936_41C4_A9FF822DFDDC",
  "this.IconButton_98C58732_A952_B936_41C4_8C681164D227",
  "this.IconButton_98C45732_A952_B936_41D6_A63EF9C8781D",
  "this.IconButton_98C47732_A952_B936_41C5_59F3E978D896",
  "this.IconButton_98C46732_A952_B936_41D7_43C1091475DF"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 185.9,
 "minHeight": 1,
 "paddingTop": 0,
 "scrollBarOpacity": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "horizontalAlign": "center",
 "height": 531.8,
 "top": "11.87%",
 "gap": 3,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "class": "Container",
 "borderRadius": 0,
 "visible": false,
 "overflow": "scroll",
 "data": {
  "name": "-button set"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "veilPopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 350,
  "easing": "cubic_in_out"
 },
 "bottom": 0,
 "minWidth": 0,
 "top": 0,
 "backgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0.55,
 "borderRadius": 0,
 "visible": false,
 "class": "UIComponent",
 "paddingTop": 0,
 "data": {
  "name": "UIComponent415245"
 }
},
{
 "backgroundColorRatios": [],
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "bottom": 0,
 "minWidth": 0,
 "top": 0,
 "backgroundColor": [],
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "scaleMode": "custom",
 "borderRadius": 0,
 "visible": false,
 "class": "ZoomImage",
 "paddingTop": 0,
 "data": {
  "name": "ZoomImage415246"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "CloseButton415247"
 },
 "layout": "horizontal",
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "propagateClick": false,
 "paddingLeft": 5,
 "paddingRight": 5,
 "fontFamily": "Arial",
 "right": 10,
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 20,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 350,
  "easing": "cubic_in_out"
 },
 "iconColor": "#000000",
 "minWidth": 0,
 "iconLineWidth": 5,
 "mode": "push",
 "fontSize": "1.29vmin",
 "label": "",
 "horizontalAlign": "center",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowBlurRadius": 6,
 "top": 10,
 "gap": 5,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "pressedIconColor": "#888888",
 "paddingBottom": 5,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "visible": false,
 "class": "CloseButton",
 "paddingTop": 5,
 "iconWidth": 20,
 "cursor": "hand",
 "fontWeight": "normal"
},
{
 "transparencyActive": true,
 "maxHeight": 128,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_9351589C_A937_B7F1_41DB_55CD4F143408",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 100,
 "minHeight": 1,
 "toolTip": "Fullscreen",
 "toolTipPaddingTop": 4,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_9351589C_A937_B7F1_41DB_55CD4F143408.png",
 "pressedRollOverIconURL": "skin/IconButton_9351589C_A937_B7F1_41DB_55CD4F143408_pressed_rollover.png",
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "toggle",
 "verticalAlign": "middle",
 "toolTipTextShadowBlurRadius": 3,
 "horizontalAlign": "center",
 "height": 80,
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "rollOverIconURL": "skin/IconButton_9351589C_A937_B7F1_41DB_55CD4F143408_rollover.png",
 "paddingBottom": 0,
 "toolTipPaddingLeft": 6,
 "backgroundOpacity": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "class": "IconButton",
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "pressedIconURL": "skin/IconButton_9351589C_A937_B7F1_41DB_55CD4F143408_pressed.png",
 "toolTipShadowHorizontalLength": 0,
 "paddingTop": 0,
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 128,
 "data": {
  "name": "IconButton1493"
 },
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_9E6C130B_A972_7AD7_41D8_6C2301FA4627",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 100,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_9E6C130B_A972_7AD7_41D8_6C2301FA4627.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_9E6C130B_A972_7AD7_41D8_6C2301FA4627_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 80,
 "rollOverIconURL": "skin/IconButton_9E6C130B_A972_7AD7_41D8_6C2301FA4627_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_9E6C130B_A972_7AD7_41D8_6C2301FA4627_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FB"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7E26B_A733_C07A_41D0_353E50432948, this.camera_0FED53D0_E935_AEDD_41CD_8D4573AB2C04); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.19,
   "image": "this.AnimatedImageResource_DCA3DE0F_A93D_CAEE_41A5_386824B1ADC0",
   "pitch": -26.23,
   "yaw": 71.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8488147D_A752_405E_41D9_C2A650BD7646",
 "maps": [
  {
   "hfov": 20.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB65971_A733_C066_41D2_90E2F61C696F, this.camera_0FD1F3D9_E935_AECF_41DF_DB9D611695C9); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.79,
   "image": "this.AnimatedImageResource_DCA05E0F_A93D_CAEE_41E2_205C9C545F72",
   "pitch": -24.17,
   "yaw": -81.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_82579AE4_A752_406E_41D4_2BFA6158305A",
 "maps": [
  {
   "hfov": 18.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -24.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.23,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 1091,
      "height": 711
     }
    ]
   },
   "pitch": 6.57,
   "yaw": -6.08
  }
 ],
 "id": "overlay_727DF16B_EF76_6BC3_41E1_14C99906A52B",
 "maps": [
  {
   "hfov": 4.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": 6.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 4.18,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 1069,
      "height": 268
     }
    ]
   },
   "pitch": 3.31,
   "yaw": 4.46
  }
 ],
 "id": "overlay_6778ECCF_EF52_BAC3_41E9_51E6C771A40B",
 "maps": [
  {
   "hfov": 4.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 50
     }
    ]
   },
   "pitch": 3.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 4.18,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 1070,
      "height": 267
     }
    ]
   },
   "pitch": -0.32,
   "yaw": 4.53
  }
 ],
 "id": "overlay_6C21E079_EF52_69CE_41D4_AE5C4BD8EB6C",
 "maps": [
  {
   "hfov": 4.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 49
     }
    ]
   },
   "pitch": -0.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 4.18,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 1070,
      "height": 268
     }
    ]
   },
   "pitch": -1.4,
   "yaw": 4.5
  }
 ],
 "id": "overlay_0B0F7524_EF55_AB46_41E8_FFC55D51EE93",
 "maps": [
  {
   "hfov": 4.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 50
     }
    ]
   },
   "pitch": -1.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 4.17,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 1069,
      "height": 269
     }
    ]
   },
   "pitch": -3.6,
   "yaw": 4.53
  }
 ],
 "id": "overlay_0861BFC9_EF55_F6CE_41B3_01E94CEB54BE",
 "maps": [
  {
   "hfov": 4.17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 50
     }
    ]
   },
   "pitch": -3.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 4.31,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 1102,
      "height": 275
     }
    ]
   },
   "pitch": -4.75,
   "yaw": 4.57
  }
 ],
 "id": "overlay_7CC914C2_EF55_AAC2_41D2_8EF13F8A2D97",
 "maps": [
  {
   "hfov": 4.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_5_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 49
     }
    ]
   },
   "pitch": -4.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 4.32,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_6_0.png",
      "class": "ImageResourceLevel",
      "width": 1106,
      "height": 264
     }
    ]
   },
   "pitch": -5.94,
   "yaw": 4.54
  }
 ],
 "id": "overlay_77E6C805_EF56_D946_41D2_AC55192743A4",
 "maps": [
  {
   "hfov": 4.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DA63F13_EF76_7742_41CE_45152EE36B5A_0_HS_6_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 47
     }
    ]
   },
   "pitch": -5.94
  }
 ]
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uid72630FB2_E932_575D_41DB_5FCF09801F3C",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "ViewerArea415244"
 },
 "toolTipPaddingTop": 4
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56, this.camera_7203903C_E935_A945_41A1_DAF9ADC3B870); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.41,
   "image": "this.AnimatedImageResource_DCA21E0F_A93D_CAEE_41B3_53E701068D99",
   "pitch": -9.19,
   "yaw": -179.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_82438F8B_A74E_C0BA_41CC_FBA05AC02956",
 "maps": [
  {
   "hfov": 16.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -9.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAF246F_A732_407A_41C1_2383D9E99C42, this.camera_71E9F277_E935_A9C3_41B6_086A41D84ECB); this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 30.63,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 420,
      "height": 474
     }
    ]
   },
   "pitch": -7.12,
   "yaw": 3.66
  }
 ],
 "id": "overlay_B08E52D1_A752_40A6_41D9_4C886816C9F9",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD, this.camera_71DCD27F_E935_A9C3_41BD_38EE7FFD8980); this.mainPlayList.set('selectedIndex', 57)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.66,
   "image": "this.AnimatedImageResource_DCA40E11_A93D_CAF2_41E4_BB19EFAC8BF3",
   "pitch": -37.44,
   "yaw": 138.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BFA45CB2_A74E_40EA_41D3_0CD1B6A2FA72",
 "maps": [
  {
   "hfov": 17.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 138.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -37.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3, this.camera_71C65287_E935_A943_41D0_6F2F1F7E2182); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.56,
   "image": "this.AnimatedImageResource_DAD458AB_A94D_F7D7_41CA_33AA3A3BA8FA",
   "pitch": -7.95,
   "yaw": -34.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_265B3770_A956_5931_41C9_B6F49329270D",
 "maps": [
  {
   "hfov": 14.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -34.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.95
  }
 ]
},
{
 "class": "VideoPlayer",
 "viewerArea": "this.viewer_uid72636FB0_E932_575D_41E2_48EC88ED0D97",
 "id": "viewer_uid72636FB0_E932_575D_41E2_48EC88ED0D97VideoPlayer",
 "displayPlaybackBar": true
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6, this.camera_73A070C1_E935_A93F_41CB_D6F3A74C88BF); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.96,
   "image": "this.AnimatedImageResource_DC91CE17_A93D_CAFE_41DF_532BD328D75A",
   "pitch": -22.98,
   "yaw": 19.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F52D9C15_A8FE_CEF3_41DE_F2735A5AF6FD",
 "maps": [
  {
   "hfov": 18.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 19.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -22.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC, this.camera_73AEF0C9_E935_AACF_41DE_CF52F3ED76B1); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.59,
   "image": "this.AnimatedImageResource_DC966E17_A93D_CAFE_41E3_E915C3D71D29",
   "pitch": -30.46,
   "yaw": -74.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F7199BD5_A8FD_C973_41A0_F3E40C3DB67E",
 "maps": [
  {
   "hfov": 20.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -74.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -30.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB3D7F0_A732_4066_41D0_840464573FEC, this.camera_73B8E0B8_E935_A94D_41E5_D7B666D59162); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.27,
   "image": "this.AnimatedImageResource_DC968E17_A93D_CAFE_41D7_D06410697956",
   "pitch": -5.14,
   "yaw": -171.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F78282E4_A8F3_DB51_41DA_923EACFC1053",
 "maps": [
  {
   "hfov": 10.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B, this.camera_712CC2F1_E935_AEDF_41E3_68F2F74402EB); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.16,
   "image": "this.AnimatedImageResource_DC90CE16_A93D_CAFE_41DB_6F2B820A64F7",
   "pitch": -26.55,
   "yaw": -58.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FBCB1F6B_A8FE_4957_41D2_E6B824066C25",
 "maps": [
  {
   "hfov": 19.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB215DB_A732_405A_41E3_2A738B528018, this.camera_711142FA_E935_AECD_41D4_7E268E073361); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.61,
   "image": "this.AnimatedImageResource_DC917E16_A93D_CAFE_4175_6F3FF9C74936",
   "pitch": -25.31,
   "yaw": 27.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F419847C_A8FF_FF31_4192_9F5193F527B1",
 "maps": [
  {
   "hfov": 18.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 27.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -25.31
  }
 ]
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uid72636FB0_E932_575D_41E2_48EC88ED0D97",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "ViewerArea415242"
 },
 "toolTipPaddingTop": 4
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1, this.camera_73FA505F_E935_A9C3_41E2_32AC2908D4B6); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.54,
   "image": "this.AnimatedImageResource_DC98CE13_A93D_CAF6_41BD_CB350C0A3ED8",
   "pitch": -31.21,
   "yaw": -178.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B3793F04_A75E_C1AD_41CF_22CA8D4B2AAC",
 "maps": [
  {
   "hfov": 22.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -31.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB24E65_A732_406E_41C7_08796165960B, this.camera_73FD3056_E935_A9C5_41D8_B0BBF91D3BAB); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 30.4,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 420,
      "height": 511
     }
    ]
   },
   "pitch": -10.01,
   "yaw": -53.37
  }
 ],
 "id": "overlay_BE2BB0D9_A772_40A6_41D3_ADF23EBC1E56",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA, this.camera_73D8308B_E935_A943_41CA_667E303B9AE4); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.05,
   "image": "this.AnimatedImageResource_DCAF0E0D_A93D_CAD2_41D9_CB7504A9C005",
   "pitch": -40.48,
   "yaw": -146.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BAFA7502_A752_41AA_41DC_EB80B195646B",
 "maps": [
  {
   "hfov": 13.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -146.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -40.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7C699_A732_40A6_41A1_27020D79BC08, this.camera_73D35082_E935_A93D_41DC_41D6797288CC); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.33,
   "image": "this.AnimatedImageResource_DCAF8E0D_A93D_CAD2_41DA_77ED2DCCF802",
   "pitch": -27.09,
   "yaw": 7.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B95E3748_A752_C1A5_418C_9A0295CF1DD8",
 "maps": [
  {
   "hfov": 18.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -27.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677, this.camera_73C6C094_E935_A945_41A0_691D1333EFFC); this.mainPlayList.set('selectedIndex', 69)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.1,
   "image": "this.AnimatedImageResource_D274FE1B_A95E_4AF7_41D5_9AA6762B8869",
   "pitch": 4.34,
   "yaw": -30.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_247C62CF_A952_DB6F_41C1_9EFC3EC7157F",
 "maps": [
  {
   "hfov": 14.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53, this.camera_0EEF431B_E935_AF43_41C1_876A1667CC1E); this.mainPlayList.set('selectedIndex', 56)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.71,
   "image": "this.AnimatedImageResource_DC950E18_A93D_CAF2_41D0_14B57ED08034",
   "pitch": -24.65,
   "yaw": 5.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EAEC3642_A973_BB56_41D5_410927987012",
 "maps": [
  {
   "hfov": 18.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -24.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984, this.camera_0EDC0324_E935_AF45_41C2_DDDF86BABC83); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.59,
   "image": "this.AnimatedImageResource_DC95EE19_A93D_CAF2_41E1_289C39C634FA",
   "pitch": -29.12,
   "yaw": 178.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E5AD5405_A972_FED2_41E1_14529821D807",
 "maps": [
  {
   "hfov": 21.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -29.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_60009345_EB5D_AFC7_416D_9F64453096A8",
 "maps": [
  {
   "hfov": 9.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 97,
      "height": 103
     }
    ]
   },
   "pitch": 16.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_0E0A3BF6_EB53_FEC5_41CE_AC15511E0260",
 "maps": [
  {
   "hfov": 10.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 102,
      "height": 103
     }
    ]
   },
   "pitch": 1.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 64)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_60244FB6_EB53_B745_41CC_367FFBD8ABE7",
 "maps": [
  {
   "hfov": 9.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 100,
      "height": 103
     }
    ]
   },
   "pitch": -12.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_717DEAF7_EB52_7EC3_41E2_3C318504315A",
 "maps": [
  {
   "hfov": 9.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 97,
      "height": 104
     }
    ]
   },
   "pitch": 16.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_705BE194_EB52_AB45_41A1_1ACDCECA44C5",
 "maps": [
  {
   "hfov": 10.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 101,
      "height": 104
     }
    ]
   },
   "pitch": 1.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 30); this.showPopupPanoramaOverlay(this.popup_0B767245_EB4E_A9C7_41E7_FA9EC1FACAE1, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_7AA2CD05_EB73_DB47_41E4_D0F589A9D591, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_0D9B0A0B_EB52_D943_41C7_AF48F374B5C9",
 "maps": [
  {
   "hfov": 9.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_0_HS_5_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 99,
      "height": 103
     }
    ]
   },
   "pitch": -12.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_0CA4D238_EB55_E94D_419F_015CAB75B130",
 "maps": [
  {
   "hfov": 10.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_6_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 109,
      "height": 39
     }
    ]
   },
   "pitch": 9.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_0C746E95_EB55_B947_41E2_FBFBC3B00427",
 "maps": [
  {
   "hfov": 10.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_7_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 111,
      "height": 38
     }
    ]
   },
   "pitch": -5.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 64)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_0AAC1B14_EB56_7F45_41DC_92592993300F",
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_8_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 105,
      "height": 38
     }
    ]
   },
   "pitch": -19.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_603F1AFB_EB56_BEC3_41D4_84C15C0A4D53",
 "maps": [
  {
   "hfov": 10.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_9_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 109,
      "height": 38
     }
    ]
   },
   "pitch": 9.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1C587D99_EB56_DB4F_417C_B5CC739C9742",
 "maps": [
  {
   "hfov": 10.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_10_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 111,
      "height": 38
     }
    ]
   },
   "pitch": -5.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_603C5958_EB56_DBCD_41E0_CF0D8B45884E",
 "maps": [
  {
   "hfov": 10.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F3B9243_EB5E_A9C3_41D8_F657E6057282_1_HS_11_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 106,
      "height": 38
     }
    ]
   },
   "pitch": -19.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD419A66_A732_C06D_41CD_464B3C602523, this.camera_70D801A7_E935_AB43_41E5_5F76A7DCA60A); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.14,
   "image": "this.AnimatedImageResource_DCB58E0B_A93D_CAD6_41DE_4FBF334A8CCE",
   "pitch": -26.2,
   "yaw": 85.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E28A8DE4_A8D5_C951_41B4_61CFDB16F8F2",
 "maps": [
  {
   "hfov": 24.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 85.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC, this.camera_70C0A1AF_E935_AB43_41D3_388204A49149); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.86,
   "image": "this.AnimatedImageResource_DCAA2E0B_A93D_CAD6_41D5_B09C1D8D611A",
   "pitch": -18.27,
   "yaw": -1.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FDD93998_A8DE_49F1_41D3_FEB5BFF979CA",
 "maps": [
  {
   "hfov": 20.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -18.27
  }
 ]
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uid72633FB1_E932_575F_41E4_2EDDC1224253",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "ViewerArea415243"
 },
 "toolTipPaddingTop": 4
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B, this.camera_0E59C381_E935_AF3F_41E4_6C1A0EB2CBB8); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.57,
   "image": "this.AnimatedImageResource_DC9BEE12_A93D_CAF6_41E3_0CCC49D48166",
   "pitch": -7.68,
   "yaw": 79.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B2B86CAE_A756_C0FA_41D5_C21776DF779A",
 "maps": [
  {
   "hfov": 14.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 79.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38, this.camera_0E6BE378_E935_AFCD_41D1_89FC7CA0978A); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.35,
   "image": "this.AnimatedImageResource_DC981E12_A93D_CAF6_41E2_ECABD694EE53",
   "pitch": -35.07,
   "yaw": -96.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B29E89D3_A756_40AA_41D4_2FDEBAEEADA9",
 "maps": [
  {
   "hfov": 21.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -35.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88, this.camera_73EF8070_E935_A9DD_41E6_100BCE45C3C6); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.38,
   "image": "this.AnimatedImageResource_DC89FE1A_A93D_CAF6_41E0_A9085FE9CAAE",
   "pitch": -35.4,
   "yaw": -81.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B9F6E389_A75E_40A6_41D9_114ECEEE0458",
 "maps": [
  {
   "hfov": 22.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -35.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB65971_A733_C066_41D2_90E2F61C696F, this.camera_73E0C068_E935_A9CD_41D2_00CF1DD6B7B2); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 29.32,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 408,
      "height": 564
     }
    ]
   },
   "pitch": -12.61,
   "yaw": 4.56
  }
 ],
 "id": "overlay_B805B516_A75E_C1AA_41DA_77CD4B1C40B1",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56, this.camera_73D49079_E935_A9CF_41D1_937A33A34193); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.97,
   "image": "this.AnimatedImageResource_DC8E5E1A_A93D_CAF6_41C9_F9C3999788DA",
   "pitch": -35.24,
   "yaw": 94.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B8E310EA_A75D_C07A_41C3_C5BE6963F42B",
 "maps": [
  {
   "hfov": 21.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -35.24
  }
 ]
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uid727E4FAE_E932_5745_41A4_5CAD46B70B6C",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "ViewerArea415239"
 },
 "toolTipPaddingTop": 4
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1, this.camera_73B2F0B0_E935_A95D_41B8_B89D403179BB); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Generic 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.13,
   "image": "this.AnimatedImageResource_DCA8FE0C_A93D_CAD2_41D3_9A33EBEA52BF",
   "pitch": 0.58,
   "yaw": -0.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B74E3470_A752_4066_41C0_621660006137",
 "maps": [
  {
   "hfov": 21.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38, this.camera_0E04B3B4_E935_AF45_41DA_90752D3BADBE); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.22,
   "image": "this.AnimatedImageResource_DCA4FE11_A93D_CAF2_41DA_0B4E5C6802A6",
   "pitch": -28.23,
   "yaw": 95.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B0AE04A9_A752_40E6_41C0_AA40BAD2F26B",
 "maps": [
  {
   "hfov": 23.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 95.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -28.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E, this.camera_0E0AC3BD_E935_AF47_41C4_B6157D42400F); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.48,
   "image": "this.AnimatedImageResource_DCA51E11_A93D_CAF2_41D6_06AA649AF0BC",
   "pitch": -4.35,
   "yaw": -74.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B0A17155_A752_41AE_41D5_8E5270381860",
 "maps": [
  {
   "hfov": 15.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -74.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD, this.camera_0E4FF38C_E935_AF45_419E_0D8F73C91BAE); this.mainPlayList.set('selectedIndex', 57)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.94,
   "image": "this.AnimatedImageResource_DCAD8E0E_A93D_CAEE_41E0_0E176494A7E6",
   "pitch": -32.43,
   "yaw": 26.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BB19E507_A74E_41AA_41C8_C0555C7E3EC9",
 "maps": [
  {
   "hfov": 22.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 26.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -32.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA, this.camera_704DC225_E935_A947_41D1_DDDB0CA95E07); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 19.82,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 274,
      "height": 337
     }
    ]
   },
   "pitch": -10.49,
   "yaw": -94.69
  }
 ],
 "id": "overlay_B543C561_A752_C066_41E3_07747D9BF331",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A, this.camera_7045221C_E935_A945_41E7_EBDD575BA538); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.85,
   "image": "this.AnimatedImageResource_DC9B2E12_A93D_CAF6_41DD_2B643FDD6C55",
   "pitch": -26.89,
   "yaw": 1.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B5DD1179_A752_4066_41E4_195AC671C346",
 "maps": [
  {
   "hfov": 18.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B, this.camera_7030022D_E935_A947_41DE_2BA98B4D5CDC); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.74,
   "image": "this.AnimatedImageResource_DC9B7E12_A93D_CAF6_41DB_AC099105905D",
   "pitch": -31.37,
   "yaw": 178.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B45A2EA9_A752_40E6_41E0_32AD4AB883A9",
 "maps": [
  {
   "hfov": 21.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -31.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAB7EF1_A733_C066_4189_28537924BD21, this.camera_7052E214_E935_A945_41E5_95EA5E720998); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.49,
   "image": "this.AnimatedImageResource_DC98BE12_A93D_CAF6_41C5_AB95F825955B",
   "pitch": -1.77,
   "yaw": 5.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E752C971_A936_C933_41C8_C42FE17B1790",
 "maps": [
  {
   "hfov": 12.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1, this.camera_71072302_E935_AF3D_41A1_76426CE3539C); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 30.71,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 420,
      "height": 549
     }
    ]
   },
   "pitch": -5.82,
   "yaw": 1.74
  }
 ],
 "id": "overlay_E1DED4B7_A932_DF3F_41DC_3B4A5015FF62",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD419A66_A732_C06D_41CD_464B3C602523, this.camera_0EF4F30B_E935_AF43_41D5_AA4AC944C643); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.37,
   "image": "this.AnimatedImageResource_DCA75E11_A93D_CAF2_41E2_3FDFE50E1171",
   "pitch": -32.52,
   "yaw": 91.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E2683135_A933_F932_41C3_779DAC65D954",
 "maps": [
  {
   "hfov": 20.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 91.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -32.52
  }
 ]
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uid72639FAF_E932_5743_41E1_859BA481314F",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "ViewerArea415241"
 },
 "toolTipPaddingTop": 4
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7C699_A732_40A6_41A1_27020D79BC08, this.camera_703A5236_E935_A945_41E3_AB5BEBA3DECE); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.4,
   "image": "this.AnimatedImageResource_DCA34E0F_A93D_CAEE_41DB_D5EE3D8AD556",
   "pitch": -3.35,
   "yaw": -104.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8305142B_A752_47FA_41C7_069CFB72B250",
 "maps": [
  {
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A, this.camera_7023123E_E935_A945_41E6_A2BAFCCAE8CB); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.67,
   "image": "this.AnimatedImageResource_D8F806B7_A94E_BB3F_41A8_D9D90AC176BC",
   "pitch": -32.59,
   "yaw": -175.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4C416F4_A972_FB32_41E1_B8FE51D736EA",
 "maps": [
  {
   "hfov": 22.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -32.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAB7EF1_A733_C066_4189_28537924BD21, this.camera_70BD01C0_E935_AB3D_41B9_24E5790836E0); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Arrow 06b Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.48,
   "image": "this.AnimatedImageResource_DCAA4E0B_A93D_CAD6_41D2_E9969C630EDB",
   "pitch": -14.95,
   "yaw": -94.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_E0951118_A8CD_B6F1_41DF_343D67A1711F",
 "maps": [
  {
   "hfov": 34.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -94.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 51,
      "height": 16
     }
    ]
   },
   "pitch": -14.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84, this.camera_70A591C8_E935_AACD_41B6_3160C18CFD17); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.6,
   "image": "this.AnimatedImageResource_DCAAEE0B_A93D_CAD6_41E0_D5CD0899595B",
   "pitch": -20.85,
   "yaw": 94.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E3579744_A8CE_B952_41D5_B222FDAE823B",
 "maps": [
  {
   "hfov": 23.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -20.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 33.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 992,
      "height": 401
     }
    ]
   },
   "pitch": -34.37,
   "yaw": 133.92
  }
 ],
 "id": "overlay_E371476C_A8CE_F951_41CF_BC1EAC3D02AF",
 "maps": [
  {
   "hfov": 33.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -34.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84, this.camera_70AFD1D1_E935_AADF_41C8_314D12C1BB21); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 27.31,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 791,
      "height": 414
     }
    ]
   },
   "pitch": -33.51,
   "yaw": 92.8
  }
 ],
 "id": "overlay_FC637B94_A8D3_C9F1_41D7_AA86BFC5AFEF",
 "maps": [
  {
   "hfov": 27.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 30,
      "height": 16
     }
    ]
   },
   "pitch": -33.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Arrow 09b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.24,
   "image": "this.AnimatedImageResource_DCAB5E0B_A93D_CAD6_41C6_DBAA9094CDCB",
   "pitch": -22.89,
   "yaw": 134.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FD135799_A8D6_D9F2_41D9_D42720E17098",
 "maps": [
  {
   "hfov": 31.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -22.89
  }
 ]
},
{
 "class": "VideoPlayer",
 "viewerArea": "this.viewer_uid727E4FAE_E932_5745_41A4_5CAD46B70B6C",
 "id": "viewer_uid727E4FAE_E932_5745_41A4_5CAD46B70B6CVideoPlayer",
 "displayPlaybackBar": true
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E, this.camera_0EF9A313_E935_AF43_41E9_388992F33078); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.57,
   "image": "this.AnimatedImageResource_DC884E1A_A93D_CAF6_41E5_BEA356CD157F",
   "pitch": -2.87,
   "yaw": -30.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BF91BFB8_A74E_C0E6_419C_8D933774EA96",
 "maps": [
  {
   "hfov": 10.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.87
  }
 ]
},
{
 "class": "VideoPlayer",
 "viewerArea": "this.viewer_uid72639FAF_E932_5743_41E1_859BA481314F",
 "id": "viewer_uid72639FAF_E932_5743_41E1_859BA481314FVideoPlayer",
 "displayPlaybackBar": true
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA, this.camera_0EAA5346_E935_AFC5_41D6_0C538B5911EE); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.74,
   "image": "this.AnimatedImageResource_DCA90E0C_A93D_CAD2_41DD_D27625B3329E",
   "pitch": 2.08,
   "yaw": -2.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B61FD39F_A755_C0DB_41D7_B599A45D7682",
 "maps": [
  {
   "hfov": 9.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.08
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD429AA5_A732_40EE_41E2_BAA850034578, this.camera_0E9ED351_E935_AFDF_41E4_20E0BC5ED08A); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 0.14,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 8,
      "height": 8
     }
    ]
   },
   "pitch": 65.12,
   "yaw": 118.06
  }
 ],
 "id": "overlay_99705FDF_A955_C96F_41D6_4FE8A4DFA4B1",
 "maps": [
  {
   "hfov": 0.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 118.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 8,
      "height": 8
     }
    ]
   },
   "pitch": 65.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B, this.camera_0EA4533D_E935_AF47_41E1_0CBEBD85A368); this.mainPlayList.set('selectedIndex', 59)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.49,
   "image": "this.AnimatedImageResource_DCA9CE0C_A93D_CAD2_41DE_5DBBA3950816",
   "pitch": -16.54,
   "yaw": 164.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FE92BAB3_A8D7_CB37_41AC_1D7A2559F8A3",
 "maps": [
  {
   "hfov": 18.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 164.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -16.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711, this.camera_0FFF43C6_E935_AEC5_41E9_B1ADFEC33054); this.mainPlayList.set('selectedIndex', 63)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.97,
   "image": "this.AnimatedImageResource_5681714D_E953_ABC7_41D2_AE41E7E3C4E0",
   "pitch": -6.63,
   "yaw": -75.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6A51BBA2_E956_7F7D_41E2_DCD3391E4A58",
 "maps": [
  {
   "hfov": 9.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -75.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E, this.camera_71C9428F_E935_A943_41B2_7CBDFDE8A167); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.4,
   "image": "this.AnimatedImageResource_0C760788_E8CE_774D_41E3_5CF6FE9A938A",
   "pitch": -9.36,
   "yaw": -101.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7CDD754B_E8CE_ABC3_41D3_7B2D67D81E2B",
 "maps": [
  {
   "hfov": 16.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -101.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -9.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB0B76A_A732_407A_41E4_8D55B283318E, this.camera_0E3C3398_E935_AF4D_41D9_1216532B5D0D); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.26,
   "image": "this.AnimatedImageResource_C46D9F50_A9D6_4971_41B4_672EBD6B3C38",
   "pitch": -27.51,
   "yaw": 90.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EB0BD59C_A94E_59F1_41D3_7DAF46EBD920",
 "maps": [
  {
   "hfov": 18.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -27.51
  }
 ]
},
{
 "class": "VideoPlayer",
 "viewerArea": "this.viewer_uid7263EFAF_E932_5743_41C0_08637DA69632",
 "id": "viewer_uid7263EFAF_E932_5743_41C0_08637DA69632VideoPlayer",
 "displayPlaybackBar": true
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD42FA62_A732_406A_41C3_227D74703849, this.camera_0FC7A3E1_E935_AEFF_41D5_CA727F9E7C57); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.15,
   "image": "this.AnimatedImageResource_DCAEAE0D_A93D_CAD2_41D4_CE3DD89350C6",
   "pitch": -16.64,
   "yaw": 1.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FDB9EA96_A8DF_CBF1_41C6_C4F0F8B68795",
 "maps": [
  {
   "hfov": 23.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -16.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84, this.camera_0FB453E9_E935_AECF_41E8_6508E1F5751F); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.94,
   "image": "this.AnimatedImageResource_DCAEFE0D_A93D_CAD2_41B6_1B21AA349F7E",
   "pitch": -14.4,
   "yaw": -176.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FE6B71AC_A8DE_D9D1_41E2_8D975C124477",
 "maps": [
  {
   "hfov": 19.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -176.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -14.4
  }
 ]
},
{
 "class": "VideoPlayer",
 "viewerArea": "this.viewer_uid72633FB1_E932_575F_41E4_2EDDC1224253",
 "id": "viewer_uid72633FB1_E932_575F_41E4_2EDDC1224253VideoPlayer",
 "displayPlaybackBar": true
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 45.06,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 613,
      "height": 1344
     }
    ]
   },
   "pitch": -0.25,
   "yaw": -159.62
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_ECE43160_A976_F951_4194_BD9704C23438",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 45.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 35
     }
    ]
   },
   "pitch": -0.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B, this.camera_7367310D_E935_AB47_41E5_5045C38D7AB4); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.03,
   "image": "this.AnimatedImageResource_DC976E17_A93D_CAFE_41B1_DA6611AD6A1E",
   "pitch": -4.86,
   "yaw": -75.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EC967308_A975_BAD1_41D0_01128D6DCF6C",
 "maps": [
  {
   "hfov": 22.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -75.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D, this.camera_7355111E_E935_AB45_41CB_7D2B12C09961); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 35.13,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 494,
      "height": 650
     }
    ]
   },
   "pitch": -14.95,
   "yaw": 64.48
  }
 ],
 "id": "overlay_EDB92332_A973_D931_4183_60A7EC89951B",
 "maps": [
  {
   "hfov": 35.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 64.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": -14.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1, this.camera_736EB115_E935_AB47_41CB_3F944CBF1999); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 43.02,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 598,
      "height": 665
     }
    ]
   },
   "pitch": -12.07,
   "yaw": 160.8
  }
 ],
 "id": "overlay_EFF02860_A97E_B751_41E0_5EC68D51B67E",
 "maps": [
  {
   "hfov": 43.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 160.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -12.07
  }
 ]
},
{
 "class": "VideoPlayer",
 "viewerArea": "this.viewer_uid72630FB2_E932_575D_41DB_5FCF09801F3C",
 "id": "viewer_uid72630FB2_E932_575D_41DB_5FCF09801F3CVideoPlayer",
 "displayPlaybackBar": true
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1, this.camera_709061D9_E935_AACF_41E2_7E16DD91E307); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.79,
   "image": "this.AnimatedImageResource_DC88EE1A_A93D_CAF6_41E2_DB5F455D5216",
   "pitch": -6.13,
   "yaw": 11.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B6197C24_A756_47EE_41DE_8CED47B7EEC7",
 "maps": [
  {
   "hfov": 19.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1, this.camera_708301EA_E935_AACD_41E6_F23316CFA9F5); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.01,
   "image": "this.AnimatedImageResource_DC890E1A_A93D_CAF6_41CE_585EE4DC8930",
   "pitch": 4.7,
   "yaw": 179.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B6B5CD5D_A756_C05F_41B3_33161FE0B46F",
 "maps": [
  {
   "hfov": 16.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88, this.camera_709A81E1_E935_AAFF_41E7_ADB46A14B354); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.33,
   "image": "this.AnimatedImageResource_DC895E1A_A93D_CAF6_41A8_C9A8E97A18B3",
   "pitch": -41.31,
   "yaw": -34.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BA075CF3_A752_4069_41E4_9A67E59FD8E4",
 "maps": [
  {
   "hfov": 14.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -34.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -41.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 9.63,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 195,
      "height": 78
     }
    ]
   },
   "pitch": 9.44,
   "yaw": 9.63
  }
 ],
 "id": "overlay_00467495_EB72_A947_41D6_5EF8F5524D93",
 "maps": [
  {
   "hfov": 9.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 97,
      "height": 39
     }
    ]
   },
   "pitch": 9.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 9.62,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 195,
      "height": 78
     }
    ]
   },
   "pitch": -6.22,
   "yaw": 9.66
  }
 ],
 "id": "overlay_0490135E_EB72_AFC5_41B0_AE396C41B6BE",
 "maps": [
  {
   "hfov": 9.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 97,
      "height": 39
     }
    ]
   },
   "pitch": -6.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 9.71,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 197,
      "height": 77
     }
    ]
   },
   "pitch": -2.72,
   "yaw": 9.57
  }
 ],
 "id": "overlay_046648E0_EB75_FAFE_4186_6D90FC2D7832",
 "maps": [
  {
   "hfov": 9.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 98,
      "height": 38
     }
    ]
   },
   "pitch": -2.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 9.52,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 193,
      "height": 79
     }
    ]
   },
   "pitch": -13.47,
   "yaw": 9.63
  }
 ],
 "id": "overlay_1701138B_EB76_6F42_41E8_F2830F90480F",
 "maps": [
  {
   "hfov": 9.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 96,
      "height": 39
     }
    ]
   },
   "pitch": -13.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 9.38,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 190,
      "height": 79
     }
    ]
   },
   "pitch": -17.03,
   "yaw": 9.57
  }
 ],
 "id": "overlay_050BC98A_EB76_DB4D_41E7_B90DDED462A4",
 "maps": [
  {
   "hfov": 9.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 95,
      "height": 39
     }
    ]
   },
   "pitch": -17.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 9.2,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 186,
      "height": 79
     }
    ]
   },
   "pitch": -20.59,
   "yaw": 9.57
  }
 ],
 "id": "overlay_031DC7CB_EB76_D6C3_41E6_FEFF70929223",
 "maps": [
  {
   "hfov": 9.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_5_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 93,
      "height": 39
     }
    ]
   },
   "pitch": -20.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88, this.camera_7221C006_E935_A945_41DA_D6E2F76B0F85); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 14.64,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_6_0.png",
      "class": "ImageResourceLevel",
      "width": 298,
      "height": 71
     }
    ]
   },
   "pitch": -24.59,
   "yaw": -0.59
  }
 ],
 "id": "overlay_19EC6505_EB72_EB46_419A_FE64E4899D13",
 "maps": [
  {
   "hfov": 14.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE29CA4_EB4D_B945_41E6_BE9468DCD677_1_HS_6_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 149,
      "height": 35
     }
    ]
   },
   "pitch": -24.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_664C4660_E95E_69FD_41D0_4F1548541EF6, this.camera_0E8CE35C_E935_AFC5_41CA_9287F6968224); this.mainPlayList.set('selectedIndex', 64)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.61,
   "image": "this.AnimatedImageResource_5682314B_E953_ABC3_41E5_FD864CC6B094",
   "pitch": -8.89,
   "yaw": 25.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6690F6EC_E956_56C5_41E8_ED83C321693C",
 "maps": [
  {
   "hfov": 15.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 25.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.mainPlayList.set('selectedIndex', 68)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 34.96,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 479,
      "height": 307
     }
    ]
   },
   "pitch": -7.23,
   "yaw": -174.05
  }
 ],
 "id": "overlay_722122E0_E972_6EFD_41A6_06BC960A8178",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD4103F5_A732_C06F_415C_0C084836D4FB, this.camera_700AA25F_E935_A9C3_41AF_38A514668C75); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 0.09,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 8,
      "height": 8
     }
    ]
   },
   "pitch": 74.45,
   "yaw": 130.41
  }
 ],
 "id": "overlay_96059A93_A94D_CBF7_4192_0057505D3654",
 "maps": [
  {
   "hfov": 0.09,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 130.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 8,
      "height": 8
     }
    ]
   },
   "pitch": 74.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4, this.camera_70013257_E935_A9C3_41D7_2B9147E3DBDB); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.05,
   "image": "this.AnimatedImageResource_DC902E16_A93D_CAFE_41DB_2D47E6853D1C",
   "pitch": -13.13,
   "yaw": 0.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9005860F_A94E_7AEF_41C8_FE8DB07A1269",
 "maps": [
  {
   "hfov": 20.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -13.13
  }
 ]
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uid7263EFAF_E932_5743_41C0_08637DA69632",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "ViewerArea415240"
 },
 "toolTipPaddingTop": 4
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B, this.camera_738420E2_E935_AAFD_41B3_478A32BA27D3); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.9,
   "image": "this.AnimatedImageResource_DC8B7E19_A93D_CAF2_41E1_FE6E7EB9A585",
   "pitch": 3,
   "yaw": -105.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EF4B0680_A975_BBD2_41AE_F408EF30EF2A",
 "maps": [
  {
   "hfov": 22.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -105.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984, this.camera_7383B0EA_E935_AACD_41D7_F1FF7337F5C2); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.02,
   "image": "this.AnimatedImageResource_DC8BFE19_A93D_CAF2_41C7_8CD698219D5C",
   "pitch": -28.55,
   "yaw": 88.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E85B188D_A975_B7D2_41DB_E00AA9C1E8DC",
 "maps": [
  {
   "hfov": 20.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -28.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B, this.camera_716272C8_E935_AECD_41C6_B2ABBC060C20); this.mainPlayList.set('selectedIndex', 53)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.89,
   "image": "this.AnimatedImageResource_DCA2CE0F_A93D_CAEE_41E4_22BCAEA3762B",
   "pitch": -5.53,
   "yaw": 0.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CD5CA12E_ABD6_B92E_41AC_10F71BD5DE5B",
 "maps": [
  {
   "hfov": 14.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD414B66_A732_C06A_41C3_15520ACE14D1, this.camera_0E2283A2_E935_AF7D_41C7_07AD42848CD2); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.03,
   "image": "this.AnimatedImageResource_DC9E8E14_A93D_CAF2_41B8_2510F5375FF3",
   "pitch": -22.43,
   "yaw": -19.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F7BE2BF9_A8F2_4933_41D0_937C1C02C7DD",
 "maps": [
  {
   "hfov": 19.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -19.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -22.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC, this.camera_0E16D3AB_E935_AF43_41E2_6DE0FD4A93F3); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.77,
   "image": "this.AnimatedImageResource_DC9F1E14_A93D_CAF2_41D3_6C5FBB632DDC",
   "pitch": -26.82,
   "yaw": 79.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F1B6D88F_A8F6_57EF_4169_500B85236366",
 "maps": [
  {
   "hfov": 23.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 79.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4, this.camera_723C6FFD_E932_56C7_41AE_1233AA5CD816); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.82,
   "image": "this.AnimatedImageResource_DC9FBE14_A93D_CAF2_41E5_8CEDF00D9F00",
   "pitch": -16.11,
   "yaw": 92.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_918F5FAD_A94E_49D3_41E1_5A40B909C21E",
 "maps": [
  {
   "hfov": 34.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -16.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3, this.camera_72388FF4_E932_56C5_41D9_DEDF827F2676); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.59,
   "image": "this.AnimatedImageResource_DC9C2E14_A93D_CAF2_41D7_07AB8CA2D3F0",
   "pitch": -19.44,
   "yaw": -93.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EC4354FC_A972_7F31_41CC_D29B2F6C3141",
 "maps": [
  {
   "hfov": 24.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -19.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D, this.camera_7211B021_E935_A97F_41E6_66D7F239E41E); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.92,
   "image": "this.AnimatedImageResource_DC99DE13_A93D_CAF6_41A4_C8A776EC4E48",
   "pitch": -4.52,
   "yaw": -53.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F6F9F78F_A8F6_59EF_41D3_F33A2A1E9C36",
 "maps": [
  {
   "hfov": 11.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -53.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD411B76_A732_C06A_41E1_E53565184E71, this.camera_70D6019E_E935_AB45_41D8_DB9F8457D8A0); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "data": {
  "label": "Circle Generic 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.93,
   "image": "this.AnimatedImageResource_DC905E16_A93D_CAFE_41A2_3D11704CD4BD",
   "pitch": -0.04,
   "yaw": -0.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_96B2FF3B_A952_4937_41D4_7D6735D0CCE6",
 "maps": [
  {
   "hfov": 38.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E, this.camera_7199E2B0_E935_A95D_41B0_06F6A40B451C); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.3,
   "image": "this.AnimatedImageResource_DC92AE15_A93D_CAF2_41BB_BBED49B4CAA2",
   "pitch": -0.53,
   "yaw": -84.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_937E503F_A972_572F_41E0_F46FA42B1242",
 "maps": [
  {
   "hfov": 10.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481, this.camera_717C62C0_E935_A93D_41D7_D1AB771BD965); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.06,
   "image": "this.AnimatedImageResource_DC932E15_A93D_CAF2_41D8_DEC76C99037F",
   "pitch": -1.18,
   "yaw": 2.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ECDF7FDB_A976_4977_41B9_D24817AACCE8",
 "maps": [
  {
   "hfov": 16.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3, this.camera_718FD2B8_E935_A94D_41DE_FD787FB62500); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.07,
   "image": "this.AnimatedImageResource_C41FCF49_A9D6_4953_41D6_FA09EBB06186",
   "pitch": -19,
   "yaw": 178.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D6D761A4_A9F2_D9D1_41DA_72AA051B3DAB",
 "maps": [
  {
   "hfov": 22.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F, this.camera_71E0426F_E935_A9C3_41D4_8B7B20D3ED76); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.18,
   "image": "this.AnimatedImageResource_39710CCB_A8F2_4F56_41E2_5B37389A760F",
   "pitch": -8.09,
   "yaw": 156.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_26CEBBFB_A8F6_4936_41C0_06B312088BC9",
 "maps": [
  {
   "hfov": 16.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 156.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085, this.camera_70150246_E935_A9C5_41E0_139970A368AB); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 35.17,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 487,
      "height": 668
     }
    ]
   },
   "pitch": -10.83,
   "yaw": 70.81
  }
 ],
 "id": "overlay_8A05BD7F_A73E_405B_41DA_6E9F6279CEF8",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8, this.camera_701E924F_E935_A9C3_41E5_131B0D336566); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.3,
   "image": "this.AnimatedImageResource_DCADAE0E_A93D_CAEE_41E4_D599E68EFF5B",
   "pitch": -26.89,
   "yaw": 179.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8A0A8415_A73D_C7AE_41E2_2BB071AD8D26",
 "maps": [
  {
   "hfov": 21.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 38.38,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 522,
      "height": 297
     }
    ]
   },
   "pitch": -2.8,
   "yaw": 1.4
  }
 ],
 "id": "overlay_898F0848_A7D2_CFA6_41D2_FFE58737F85B",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 68); this.showPopupPanoramaOverlay(this.popup_07172251_EB4F_A9DF_41E3_6ACC2531864E, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_04FB77CE_EB5E_76C5_41D1_6B982E7C2F6F",
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_1_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 66,
      "height": 78
     }
    ]
   },
   "pitch": 6.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.98,
   "image": "this.AnimatedImageResource_7A922CCE_EB73_DAC5_41AB_BE4BA08CE6CC",
   "pitch": 6.71,
   "yaw": 6.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_711AF87A_EB5F_F9CD_41A3_D16E4907805F",
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 7.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 6.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD414B66_A732_C06A_41C3_15520ACE14D1, this.camera_739650D1_E935_AADF_41B7_7AEBD0D34738); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.02,
   "image": "this.AnimatedImageResource_DC998E14_A93D_CAF2_41BC_90E68AA133DE",
   "pitch": -22.5,
   "yaw": 81.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F9D95A81_A8F2_CBD3_41DB_871436A6C7C9",
 "maps": [
  {
   "hfov": 19.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -22.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6, this.camera_739DF0D9_E935_AACF_41E0_FAE8C85C2ED1); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.23,
   "image": "this.AnimatedImageResource_DC9E0E14_A93D_CAF2_41DA_9670E54DE501",
   "pitch": -20.92,
   "yaw": -76.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FAE6FCB6_A8F3_CF3B_41DF_9C7521178186",
 "maps": [
  {
   "hfov": 19.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -76.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -20.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481, this.camera_73364143_E935_ABC3_41DC_D66AD8AFF644); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.75,
   "image": "this.AnimatedImageResource_DC8A6E19_A93D_CAF2_41E3_073978A73D11",
   "pitch": -31.88,
   "yaw": 3.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E9F51570_A972_D931_41DD_3381C5F12A93",
 "maps": [
  {
   "hfov": 20.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -31.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB0B76A_A732_407A_41E4_8D55B283318E, this.camera_734DB13A_E935_AB4D_41D1_6E02F442E091); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.27,
   "image": "this.AnimatedImageResource_DC8AEE19_A93D_CAF2_41D8_E4C120254416",
   "pitch": -28.67,
   "yaw": -95.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E991B4E9_A972_7F53_41D9_3D5EBDEAB350",
 "maps": [
  {
   "hfov": 19.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -95.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -28.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834, this.camera_73226158_E935_ABCD_41AD_E903AF8124C6); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.45,
   "image": "this.AnimatedImageResource_DC958E18_A93D_CAF2_41D1_7C45445F6716",
   "pitch": -23.16,
   "yaw": 88.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8D657361_A737_C066_41D2_2A2E0F6B0C71",
 "maps": [
  {
   "hfov": 20.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -23.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB19940_A732_41A6_41CE_69940E32F586, this.camera_7338714F_E935_ABC3_41D6_C7E3AB7B8FF6); this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 33.28,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 457,
      "height": 709
     }
    ]
   },
   "pitch": -8.08,
   "yaw": 5.04
  }
 ],
 "id": "overlay_897C5471_A736_C066_418D_DD8BC82F5FE1",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8, this.camera_732B7160_E935_ABFD_41E9_7BFEE07B35B5); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.43,
   "image": "this.AnimatedImageResource_DC94EE18_A93D_CAF2_41E0_842985D82DFC",
   "pitch": -24.85,
   "yaw": -83.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8C37253B_A732_41DA_419D_E9E792DBCFAE",
 "maps": [
  {
   "hfov": 19.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -24.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1, this.camera_0EB66335_E935_AF47_41D5_64CDDD0C1CF3); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.28,
   "image": "this.AnimatedImageResource_DCA66E10_A93D_CAF2_41C7_07BFD9480D8E",
   "pitch": -34.71,
   "yaw": -178.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B3DFD0B8_A753_C0E5_41C2_CBCBD1AD468A",
 "maps": [
  {
   "hfov": 18.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -34.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B, this.camera_0EC1F32C_E935_AF45_41CF_77ADEA16B4CC); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.56,
   "image": "this.AnimatedImageResource_DCA69E10_A93D_CAF2_41C8_DF26F91EDA60",
   "pitch": -7.4,
   "yaw": 1.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B28A8CE5_A752_406E_41D5_0F9CD26E0716",
 "maps": [
  {
   "hfov": 26.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B, this.camera_71A7B2A0_E935_A97D_41B3_B51678E14666); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.22,
   "image": "this.AnimatedImageResource_DC992E13_A93D_CAF6_41C8_AAE29905CF79",
   "pitch": -30.18,
   "yaw": -108.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F8ECE268_A8F2_5B51_41B5_18F17DD74DFB",
 "maps": [
  {
   "hfov": 19.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -108.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -30.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D, this.camera_7195A2A8_E935_A94D_41DE_CAEC453A83D9); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.92,
   "image": "this.AnimatedImageResource_DC995E13_A93D_CAF6_41E2_F25BCEF1027C",
   "pitch": -26.39,
   "yaw": 152,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F577D3FD_A8F2_7932_41C6_3B5D340F0722",
 "maps": [
  {
   "hfov": 19.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306, this.camera_73CB10A7_E935_A943_41E7_B4C7D81F309A); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.41,
   "image": "this.AnimatedImageResource_DC9CBE15_A93D_CAF2_41E4_795705BF0556",
   "pitch": -17.38,
   "yaw": 95.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_93C580E1_A972_7753_41E3_F4473C943CCC",
 "maps": [
  {
   "hfov": 25.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 95.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -17.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B, this.camera_73CD209D_E935_A947_41DF_4D94D005315E); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.2,
   "image": "this.AnimatedImageResource_DC9D2E15_A93D_CAF2_41D1_3477A7AA39B4",
   "pitch": -16.64,
   "yaw": -3.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ED8C65DD_A973_D973_41D2_6729520492EB",
 "maps": [
  {
   "hfov": 24.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -16.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC, this.camera_707F51FA_E935_AACD_41E0_D70EF6A2E33B); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 27.26,
   "image": "this.AnimatedImageResource_DCABFE0C_A93D_CAD2_41E0_6E06E5194867",
   "pitch": -13.26,
   "yaw": 176.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FA9AC3E5_A8D2_5952_41DC_DDA977A43562",
 "maps": [
  {
   "hfov": 27.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -13.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B, this.camera_707531F2_E935_AADD_41B2_C438B18CA12A); this.mainPlayList.set('selectedIndex', 59)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.83,
   "image": "this.AnimatedImageResource_DCA81E0C_A93D_CAD2_41C3_6F0D4E44AF61",
   "pitch": -23.87,
   "yaw": -107.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F63FD293_A8D2_7BF7_41E1_4D20B2AE32D1",
 "maps": [
  {
   "hfov": 19.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -107.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -23.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B, this.camera_722E900E_E935_A945_41E3_F81D2597663C); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.51,
   "image": "this.AnimatedImageResource_DCA58E11_A93D_CAF2_41E3_99C6515459F5",
   "pitch": -30.87,
   "yaw": 90.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B076B9FB_A756_405A_41BB_FF44CF1AC6C3",
 "maps": [
  {
   "hfov": 28.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -30.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3, this.camera_7214E018_E935_A94D_41BE_901577DE187A); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.27,
   "image": "this.AnimatedImageResource_DC9A3E12_A93D_CAF6_41DE_CAE9B429988B",
   "pitch": -29.5,
   "yaw": -84.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B197F04B_A756_7FBA_419D_58330F0CA5A0",
 "maps": [
  {
   "hfov": 21.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -29.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B, this.camera_72068032_E935_A95D_41E7_CB88BA4DF9E2); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.53,
   "image": "this.AnimatedImageResource_DCA0EE10_A93D_CAF2_41D1_7765B928F447",
   "pitch": -8.81,
   "yaw": -170.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_858E08D0_A755_C0A6_41E4_28AAFF9892F9",
 "maps": [
  {
   "hfov": 14.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A, this.camera_7218402A_E935_A94D_41C2_E0A9174C9B0C); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.66,
   "image": "this.AnimatedImageResource_DCA17E10_A93D_CAF2_41E4_CDF1B04A9FBA",
   "pitch": -25.01,
   "yaw": -81.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_844528E8_A752_C066_41C5_877EEA24464D",
 "maps": [
  {
   "hfov": 18.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -25.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772, this.camera_73062173_E935_ABC3_41E0_06A4B2183521); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 35.15,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 490,
      "height": 735
     }
    ]
   },
   "pitch": -13.08,
   "yaw": 0.92
  }
 ],
 "id": "overlay_873FBE22_A752_43EA_41D3_57C44A08F2CC",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7C699_A732_40A6_41A1_27020D79BC08, this.camera_731D6169_E935_ABCF_41D8_4EC23538731C); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.03,
   "image": "this.AnimatedImageResource_DC8CAE1B_A93D_CAF6_41E2_54A3E2C99BC8",
   "pitch": -29.29,
   "yaw": 89.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_853C5893_A752_40AA_41C0_952C03843431",
 "maps": [
  {
   "hfov": 22.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -29.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B, this.camera_7308417C_E935_ABC5_41D0_8679135EEA02); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.68,
   "image": "this.AnimatedImageResource_DC8D2E1B_A93D_CAF6_41D0_8791A4DFAE28",
   "pitch": -25.86,
   "yaw": -86.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8646DC8B_A752_40BA_41E2_DD8EDB752313",
 "maps": [
  {
   "hfov": 26.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -25.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD411B76_A732_C06A_41E1_E53565184E71, this.camera_720A0045_E935_A9C7_41E7_1A488D8103D2); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.47,
   "image": "this.AnimatedImageResource_DC9DAE15_A93D_CAF2_41D5_408687CCFE3B",
   "pitch": -21.4,
   "yaw": -4.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_973A4C53_A94F_CF77_41E0_CEF9DF3A091B",
 "maps": [
  {
   "hfov": 21.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -21.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306, this.camera_73F6F04D_E935_A9C7_41E9_6E889F612059); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.41,
   "image": "this.AnimatedImageResource_DC922E15_A93D_CAF2_41AD_67845C9F1883",
   "pitch": -17.76,
   "yaw": 175.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_930792FB_A94E_BB37_4182_DECB665FCD76",
 "maps": [
  {
   "hfov": 26.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -17.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD42FA62_A732_406A_41C3_227D74703849, this.camera_0E715365_E935_AFC7_41DA_937A84916ADF); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.27,
   "image": "this.AnimatedImageResource_DC81EE1D_A93D_CAF2_41DE_A653FDC4D25D",
   "pitch": -21.05,
   "yaw": 93.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FE679FCF_A8D6_496F_41E2_3A8FAEAC7826",
 "maps": [
  {
   "hfov": 21.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -21.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1, this.camera_0E67336E_E935_AFC5_41DF_EA8F86015613); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.26,
   "image": "this.AnimatedImageResource_DC862E1D_A93D_CAF2_41CF_820C12B20814",
   "pitch": -17.83,
   "yaw": -11.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FBF65150_A8D6_B971_41DF_66808F215FBF",
 "maps": [
  {
   "hfov": 23.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -11.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -17.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A, this.camera_70CAD1B8_E935_AB4D_41D3_51DD2D0FA7D2); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.6,
   "image": "this.AnimatedImageResource_C57A2DEE_A932_492E_4176_EA619EB1D132",
   "pitch": 0.15,
   "yaw": -57.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D9BCD6D1_A936_DB72_41C0_037574F4608B",
 "maps": [
  {
   "hfov": 13.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -57.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8, this.camera_714AC2E1_E935_AEFF_41E1_4C1A3F01E9ED); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 33.09,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 455,
      "height": 276
     }
    ]
   },
   "pitch": -8.76,
   "yaw": 1.26
  }
 ],
 "id": "overlay_BDF78559_A772_C1A6_41DA_1E91C481F69C",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E, this.camera_713F02E9_E935_AECF_41CE_DF0DC68D1B54); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.27,
   "image": "this.AnimatedImageResource_DACC08B5_A94D_F733_417C_3FA3271FFE8F",
   "pitch": -28.33,
   "yaw": -127.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D5EFAD6F_A952_492F_41A9_D36380E99013",
 "maps": [
  {
   "hfov": 21.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -127.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -28.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F, this.camera_714492D9_E935_AECF_41E0_5F051E21DAE2); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.12,
   "image": "this.AnimatedImageResource_DCAC6E0D_A93D_CAD2_41B2_1546E9E2D2BD",
   "pitch": -28.84,
   "yaw": -178.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8BD95FD0_A73D_C0A6_41DE_3709BABD1802",
 "maps": [
  {
   "hfov": 22.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -28.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A, this.camera_715022D0_E935_AEDD_41DE_884015871E22); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.71,
   "image": "this.AnimatedImageResource_DCACEE0D_A93D_CAD2_41E5_1D4D5990804E",
   "pitch": -26.2,
   "yaw": -0.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8A0E01AB_A73E_C0FA_41C0_AAAD12EFF8D4",
 "maps": [
  {
   "hfov": 19.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A, this.camera_71FDB267_E935_A9C3_41B5_AFADBCA511CC); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.84,
   "image": "this.AnimatedImageResource_2EDAC5C7_A8D2_795F_41C7_F7F903ED2B0C",
   "pitch": -4.24,
   "yaw": 50.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D24B1504_A8CD_DED1_41E4_FAE152E6B4EE",
 "maps": [
  {
   "hfov": 13.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 50.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D, this.camera_735C8127_E935_AB43_41E0_48F4A8189F4D); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.63,
   "image": "this.AnimatedImageResource_2E51CBE5_B8F2_4953_41E2_7E98F76E7D02",
   "pitch": -25.24,
   "yaw": -81.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3AF1C74F_B8CE_F96E_41B7_64E3CD556779",
 "maps": [
  {
   "hfov": 18.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -25.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB215DB_A732_405A_41E3_2A738B528018, this.camera_735BD131_E935_AB5F_41E4_0B9D478F9247); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.86,
   "image": "this.AnimatedImageResource_2E514BE6_B8F2_4951_41D2_BE4348636A7D",
   "pitch": -25.24,
   "yaw": 94.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_36EFDA02_B8F2_4AD1_41D7_BA4ACE402451",
 "maps": [
  {
   "hfov": 20.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -25.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B, this.camera_70ED4196_E935_AB45_41C7_0D5BD3C21C10); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.2,
   "image": "this.AnimatedImageResource_DC8F2E1B_A93D_CAF6_419E_F83405F4EC3C",
   "pitch": -26.12,
   "yaw": -90.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_81AA03B6_A732_40EA_41E4_1DB3717C11FE",
 "maps": [
  {
   "hfov": 21.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834, this.camera_70FB118D_E935_AB47_41DB_9CBB6E719070); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.5,
   "image": "this.AnimatedImageResource_DC8FBE1B_A93D_CAF6_41D7_006649C70E0A",
   "pitch": -26.06,
   "yaw": 85.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8C49F063_A732_4069_41DF_3BE464A55823",
 "maps": [
  {
   "hfov": 18.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 85.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -26.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC, this.camera_70F28184_E935_AB45_41D7_F618E52DCAC5); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 36.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 509,
      "height": 739
     }
    ]
   },
   "pitch": -10.21,
   "yaw": 1.81
  }
 ],
 "id": "overlay_C63FFE96_ABD6_4BF1_41E2_CD64CEF8C15A",
 "maps": [
  {
   "hfov": 36.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 23
     }
    ]
   },
   "pitch": -10.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "image",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB7E26B_A733_C07A_41D0_353E50432948, this.camera_7389C0F2_E935_AADD_41D9_6228F2CA1452); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 34.13,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 472,
      "height": 668
     }
    ]
   },
   "pitch": -10.54,
   "yaw": -0.66
  }
 ],
 "id": "overlay_86D03002_A756_BFAA_41D8_FDB56BA73BC4",
 "maps": []
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56, this.camera_737FB103_E935_AB43_41C3_52C8EB6CD75D); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.51,
   "image": "this.AnimatedImageResource_DC8DCE1C_A93D_CAF2_41E3_258108F4FAC2",
   "pitch": -30.13,
   "yaw": -93.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8471269D_A756_40DE_41DD_7476D0ED307F",
 "maps": [
  {
   "hfov": 23.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -30.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B, this.camera_737180FB_E935_AAC3_41E9_737D2691086C); this.mainPlayList.set('selectedIndex', 53)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.46,
   "image": "this.AnimatedImageResource_DC825E1C_A93D_CAF2_41CD_ECD50E2100EA",
   "pitch": -34.51,
   "yaw": 86.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8216C550_A74E_C1A6_41D8_97111C9BA248",
 "maps": [
  {
   "hfov": 19.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 86.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -34.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E, this.camera_71BC6298_E935_A94D_41E9_C95B134356D5); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.4,
   "image": "this.AnimatedImageResource_DC950E18_A93D_CAF2_41D4_67CFD7A69688",
   "pitch": -0.78,
   "yaw": -21.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EE22B7BC_A972_B931_41CA_BCB97C6ED149",
 "maps": [
  {
   "hfov": 11.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B, this.camera_70601202_E935_A93D_4193_267907966B9B); this.mainPlayList.set('selectedIndex', 53)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.52,
   "image": "this.AnimatedImageResource_DCA20E0E_A93D_CAEE_41DA_C24ADA6FB2DB",
   "pitch": -27.03,
   "yaw": -177.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8F6A128F_A736_40BA_41CF_2DB53001E39C",
 "maps": [
  {
   "hfov": 21.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -27.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F, this.camera_706A220B_E935_A943_41BE_792C7D5B1466); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.32,
   "image": "this.AnimatedImageResource_DCAD0E0E_A93D_CAEE_41E4_98AAC2A0EFDF",
   "pitch": -20.23,
   "yaw": -83.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8B39628C_A736_C0BE_41C5_37DFFFC2447C",
 "maps": [
  {
   "hfov": 19.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -20.23
  }
 ]
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_9E6FD30A_A972_7AD1_41CD_FD66B0C5486F",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "paddingLeft": 0,
 "children": [
  "this.IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 110,
 "minHeight": 1,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "height": 110,
 "top": "0%",
 "gap": 10,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "button menu sup"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 52,
 "propagateClick": false,
 "id": "IconButton_785DE200_E93E_693D_41E3_EC7EE166D5EA",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 140,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_785DE200_E93E_693D_41E3_EC7EE166D5EA.png",
 "pressedRollOverIconURL": "skin/IconButton_785DE200_E93E_693D_41E3_EC7EE166D5EA_pressed_rollover.png",
 "minWidth": 1,
 "mode": "push",
 "verticalAlign": "middle",
 "click": "this.showPopupImage(this.ImageResource_7F76FA3C_EFCE_B945_41D7_8A4D949E1FCE, null, '95%', '95%', this.FadeInEffect_7F768A3C_EFCE_B945_41D7_BA2E07D6B46E, this.FadeOutEffect_7F76AA3C_EFCE_B945_41E3_0019C05708EA, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "height": 90,
 "rollOverIconURL": "skin/IconButton_785DE200_E93E_693D_41E3_EC7EE166D5EA_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_785DE200_E93E_693D_41E3_EC7EE166D5EA_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 53,
 "data": {
  "name": "IconButton6876"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_9E6C430B_A972_7AD7_41DE_3B98CF505A75",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 130,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_9E6C430B_A972_7AD7_41DE_3B98CF505A75.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_9E6C430B_A972_7AD7_41DE_3B98CF505A75_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "this.openLink('https://uploadkon.ir/uploads/53c603_25finalllll.mp4', '_blank')",
 "height": 90,
 "rollOverIconURL": "skin/IconButton_9E6C430B_A972_7AD7_41DE_3B98CF505A75_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_9E6C430B_A972_7AD7_41DE_3B98CF505A75_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_9E6C530B_A972_7AD7_41D2_A19660489CAD",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 155,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_9E6C530B_A972_7AD7_41D2_A19660489CAD.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_9E6C530B_A972_7AD7_41D2_A19660489CAD_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "this.showPopupMedia(this.window_6F0C70FC_EF76_6AC5_41E9_24D8417F650F, this.video_7C629412_EF76_E95D_419B_89533A86B262, this.playList_0B82BB22_EF72_5F7D_41E8_B5820E279C32, '90%', '100%', false, true)",
 "height": 95,
 "rollOverIconURL": "skin/IconButton_9E6C530B_A972_7AD7_41D2_A19660489CAD_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_9E6C530B_A972_7AD7_41D2_A19660489CAD_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton HS "
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_9E6C230B_A972_7AD7_41AB_6D8E50438A1B",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 170,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_9E6C230B_A972_7AD7_41AB_6D8E50438A1B.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_9E6C230B_A972_7AD7_41AB_6D8E50438A1B_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "this.mainPlayList.set('selectedIndex', 68)",
 "height": 110,
 "rollOverIconURL": "skin/IconButton_9E6C230B_A972_7AD7_41AB_6D8E50438A1B_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_9E6C230B_A972_7AD7_41AB_6D8E50438A1B_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_9E6F930B_A972_7AD7_41C6_A8464D4FEEA4",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 100,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_9E6F930B_A972_7AD7_41C6_A8464D4FEEA4.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_9E6F930B_A972_7AD7_41C6_A8464D4FEEA4_pressed_rollover.png",
 "minWidth": 1,
 "mode": "push",
 "click": "this.showPopupImage(this.ImageResource_7F788A3D_EFCE_B947_41D0_33D9B9024858, null, '90%', '90%', this.FadeInEffect_7F789A3D_EFCE_B947_41E5_8165DF47ACE5, this.FadeOutEffect_7F78AA3D_EFCE_B947_41E8_429EF90C3E74, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "height": 70,
 "rollOverIconURL": "skin/IconButton_9E6F930B_A972_7AD7_41C6_A8464D4FEEA4_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_9E6F930B_A972_7AD7_41C6_A8464D4FEEA4_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_98C59732_A952_B936_41C4_A9FF822DFDDC",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 145,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_98C59732_A952_B936_41C4_A9FF822DFDDC.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_98C59732_A952_B936_41C4_A9FF822DFDDC_pressed_rollover.png",
 "minWidth": 1,
 "mode": "push",
 "click": "this.showPopupMedia(this.window_CD7F7519_A972_5EF2_41C8_5E810CD2C96C, this.video_C91F6128_AB32_B6D1_41E1_A9EECC73AB10, this.playList_DCB0DE09_A93D_CAD2_41DE_22891093FF85, '90%', '90%', true, true)",
 "height": 90,
 "rollOverIconURL": "skin/IconButton_98C59732_A952_B936_41C4_A9FF822DFDDC_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_98C59732_A952_B936_41C4_A9FF822DFDDC_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FB"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_98C58732_A952_B936_41C4_8C681164D227",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 150,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_98C58732_A952_B936_41C4_8C681164D227.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_98C58732_A952_B936_41C4_8C681164D227_pressed_rollover.png",
 "minWidth": 1,
 "mode": "push",
 "click": "this.showPopupMedia(this.window_C8E1E17E_A932_592E_41DF_C543B96B7139, this.video_C1901015_A932_56F2_41E0_25230CE485FD, this.playList_C985B155_A932_5972_41B2_A203618BBD87, '90%', '90%', true, true)",
 "height": 110,
 "rollOverIconURL": "skin/IconButton_98C58732_A952_B936_41C4_8C681164D227_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_98C58732_A952_B936_41C4_8C681164D227_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton TWITTER"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_98C45732_A952_B936_41D6_A63EF9C8781D",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 140,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_98C45732_A952_B936_41D6_A63EF9C8781D.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_98C45732_A952_B936_41D6_A63EF9C8781D_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "this.showPopupMedia(this.window_722022E9_E9D2_AECF_41BD_8E04FCC54FF0, this.video_70071F1D_E9D5_D747_41E2_49B9BE83ABEF, this.playList_70D4D9AE_E95E_5B42_41E7_0E017183E985, '90%', '90%', false, true)",
 "height": 90,
 "rollOverIconURL": "skin/IconButton_98C45732_A952_B936_41D6_A63EF9C8781D_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_98C45732_A952_B936_41D6_A63EF9C8781D_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_98C47732_A952_B936_41C5_59F3E978D896",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 140,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_98C47732_A952_B936_41C5_59F3E978D896.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_98C47732_A952_B936_41C5_59F3E978D896_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "this.showPopupMedia(this.window_D9DE153B_A932_5937_41D5_01A3FE18C65A, this.video_D6916859_A932_5772_41E1_9349D8627414, this.playList_C493FDE2_A932_4956_41D5_DE84B2B9224A, '90%', '90%', true, true)",
 "height": 90,
 "rollOverIconURL": "skin/IconButton_98C47732_A952_B936_41C5_59F3E978D896_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_98C47732_A952_B936_41C5_59F3E978D896_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_98C46732_A952_B936_41D7_43C1091475DF",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 140,
 "minHeight": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_98C46732_A952_B936_41D7_43C1091475DF.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_98C46732_A952_B936_41D7_43C1091475DF_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "this.showPopupMedia(this.window_9C40B18A_A952_F9D1_41D2_9129198E0A78, this.video_9F6088DF_A95F_B76E_41C8_AA74B0D6A419, this.playList_9C3BC3A0_A973_D9D1_41E4_367C242271F3, '90%', '90%', true, true)",
 "height": 90,
 "rollOverIconURL": "skin/IconButton_98C46732_A952_B936_41D7_43C1091475DF_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_98C46732_A952_B936_41D7_43C1091475DF_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton HS "
 }
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA3DE0F_A93D_CAEE_41A5_386824B1ADC0",
 "levels": [
  {
   "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA05E0F_A93D_CAEE_41E2_205C9C545F72",
 "levels": [
  {
   "url": "media/panorama_ADB77DBC_A733_C0DE_41E4_C4DAE279AE5A_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA21E0F_A93D_CAEE_41B3_53E701068D99",
 "levels": [
  {
   "url": "media/panorama_ADB2F0FE_A733_C05A_41D1_95AC0F7AA772_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA40E11_A93D_CAF2_41E4_BB19EFAC8BF3",
 "levels": [
  {
   "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DAD458AB_A94D_F7D7_41CA_33AA3A3BA8FA",
 "levels": [
  {
   "url": "media/panorama_ADAD6374_A732_406D_41A6_B66F51DF0E8E_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC91CE17_A93D_CAFE_41DF_532BD328D75A",
 "levels": [
  {
   "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC966E17_A93D_CAFE_41E3_E915C3D71D29",
 "levels": [
  {
   "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC968E17_A93D_CAFE_41D7_D06410697956",
 "levels": [
  {
   "url": "media/panorama_ADB2801E_A732_DFDA_41DE_BDB02CA1EF2D_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC90CE16_A93D_CAFE_41DB_6F2B820A64F7",
 "levels": [
  {
   "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC917E16_A93D_CAFE_4175_6F3FF9C74936",
 "levels": [
  {
   "url": "media/panorama_AD414B66_A732_C06A_41C3_15520ACE14D1_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC98CE13_A93D_CAF6_41BD_CB350C0A3ED8",
 "levels": [
  {
   "url": "media/panorama_ADAA1C5A_A732_405A_41D3_40D465F0714A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAF0E0D_A93D_CAD2_41D9_CB7504A9C005",
 "levels": [
  {
   "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAF8E0D_A93D_CAD2_41DA_77ED2DCCF802",
 "levels": [
  {
   "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_D274FE1B_A95E_4AF7_41D5_9AA6762B8869",
 "levels": [
  {
   "url": "media/panorama_ADA9E145_A732_41A9_41B2_3E6E0300EF88_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC950E18_A93D_CAF2_41D0_14B57ED08034",
 "levels": [
  {
   "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC95EE19_A93D_CAF2_41E1_289C39C634FA",
 "levels": [
  {
   "url": "media/panorama_ADB0B76A_A732_407A_41E4_8D55B283318E_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCB58E0B_A93D_CAD6_41DE_4FBF334A8CCE",
 "levels": [
  {
   "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAA2E0B_A93D_CAD6_41D5_B09C1D8D611A",
 "levels": [
  {
   "url": "media/panorama_AD8F0D09_A732_C1A7_41E0_7B97D8325C84_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9BEE12_A93D_CAF6_41E3_0CCC49D48166",
 "levels": [
  {
   "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC981E12_A93D_CAF6_41E2_ECABD694EE53",
 "levels": [
  {
   "url": "media/panorama_ADB0D6C7_A732_40AA_41CC_5CA578A8D36B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC89FE1A_A93D_CAF6_41E0_A9085FE9CAAE",
 "levels": [
  {
   "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8E5E1A_A93D_CAF6_41C9_F9C3999788DA",
 "levels": [
  {
   "url": "media/panorama_ADB7C699_A732_40A6_41A1_27020D79BC08_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA8FE0C_A93D_CAD2_41D3_9A33EBEA52BF",
 "levels": [
  {
   "url": "media/panorama_AD429AA5_A732_40EE_41E2_BAA850034578_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 1350
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA4FE11_A93D_CAF2_41DA_0B4E5C6802A6",
 "levels": [
  {
   "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA51E11_A93D_CAF2_41D6_06AA649AF0BC",
 "levels": [
  {
   "url": "media/panorama_ADB3B837_A732_4FEA_41C8_8F9DEFB198D3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAD8E0E_A93D_CAEE_41E0_0E176494A7E6",
 "levels": [
  {
   "url": "media/panorama_ADB2ECF1_A733_C067_41D2_83080DD5F7F8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9B2E12_A93D_CAF6_41DD_2B643FDD6C55",
 "levels": [
  {
   "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9B7E12_A93D_CAF6_41DB_AC099105905D",
 "levels": [
  {
   "url": "media/panorama_ADB6F1F3_A732_406B_418C_09DBA3412FB1_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC98BE12_A93D_CAF6_41C5_AB95F825955B",
 "levels": [
  {
   "url": "media/panorama_ADB56BA5_A732_40EE_41DB_288C95F1B2F1_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA75E11_A93D_CAF2_41E2_3FDFE50E1171",
 "levels": [
  {
   "url": "media/panorama_ADAB7EF1_A733_C066_4189_28537924BD21_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA34E0F_A93D_CAEE_41DB_D5EE3D8AD556",
 "levels": [
  {
   "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_D8F806B7_A94E_BB3F_41A8_D9D90AC176BC",
 "levels": [
  {
   "url": "media/panorama_ADB65971_A733_C066_41D2_90E2F61C696F_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAA4E0B_A93D_CAD6_41D2_E9969C630EDB",
 "levels": [
  {
   "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 640,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAAEE0B_A93D_CAD6_41E0_D5CD0899595B",
 "levels": [
  {
   "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAB5E0B_A93D_CAD6_41C6_DBAA9094CDCB",
 "levels": [
  {
   "url": "media/panorama_AD419A66_A732_C06D_41CD_464B3C602523_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC884E1A_A93D_CAF6_41E5_BEA356CD157F",
 "levels": [
  {
   "url": "media/panorama_ADAF246F_A732_407A_41C1_2383D9E99C42_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA90E0C_A93D_CAD2_41DD_D27625B3329E",
 "levels": [
  {
   "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA9CE0C_A93D_CAD2_41DE_5DBBA3950816",
 "levels": [
  {
   "url": "media/panorama_ADB140F7_A732_406A_41D2_FD7E2C12E2D1_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_5681714D_E953_ABC7_41D2_AE41E7E3C4E0",
 "levels": [
  {
   "url": "media/panorama_664C4660_E95E_69FD_41D0_4F1548541EF6_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_0C760788_E8CE_774D_41E3_5CF6FE9A938A",
 "levels": [
  {
   "url": "media/panorama_ADB4D988_A732_C0A6_41E1_00B2E8C5B72D_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C46D9F50_A9D6_4971_41B4_672EBD6B3C38",
 "levels": [
  {
   "url": "media/panorama_ADB7A838_A732_4FE6_41C2_84B0B423DF53_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAEAE0D_A93D_CAD2_41D4_CE3DD89350C6",
 "levels": [
  {
   "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAEFE0D_A93D_CAD2_41B6_1B21AA349F7E",
 "levels": [
  {
   "url": "media/panorama_ADAE09A6_A732_40EA_41DF_74A4445B64FC_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC976E17_A93D_CAFE_41B1_DA6611AD6A1E",
 "levels": [
  {
   "url": "media/panorama_ADB364B5_A732_C0EF_41D0_45BE678FFD1E_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC88EE1A_A93D_CAF6_41E2_DB5F455D5216",
 "levels": [
  {
   "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC890E1A_A93D_CAF6_41CE_585EE4DC8930",
 "levels": [
  {
   "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC895E1A_A93D_CAF6_41A8_C9A8E97A18B3",
 "levels": [
  {
   "url": "media/panorama_ADB51DA9_A732_40E6_41DE_C44F9977DFAA_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_5682314B_E953_ABC3_41E5_FD864CC6B094",
 "levels": [
  {
   "url": "media/panorama_D74A62DB_A8F2_BB77_41C0_FA09FA69D711_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC902E16_A93D_CAFE_41DB_2D47E6853D1C",
 "levels": [
  {
   "url": "media/panorama_AD411B76_A732_C06A_41E1_E53565184E71_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8B7E19_A93D_CAF2_41E1_FE6E7EB9A585",
 "levels": [
  {
   "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8BFE19_A93D_CAF2_41C7_8CD698219D5C",
 "levels": [
  {
   "url": "media/panorama_ADA8F00E_A732_5FBA_41B3_D38EBA31B481_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA2CE0F_A93D_CAEE_41E4_22BCAEA3762B",
 "levels": [
  {
   "url": "media/panorama_AD47B1C2_A733_C0AA_41B4_0DEC707763EC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9E8E14_A93D_CAF2_41B8_2510F5375FF3",
 "levels": [
  {
   "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9F1E14_A93D_CAF2_41D3_6C5FBB632DDC",
 "levels": [
  {
   "url": "media/panorama_ADB215DB_A732_405A_41E3_2A738B528018_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9FBE14_A93D_CAF2_41E5_8CEDF00D9F00",
 "levels": [
  {
   "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9C2E14_A93D_CAF2_41D7_07AB8CA2D3F0",
 "levels": [
  {
   "url": "media/panorama_ADB742D9_A732_C0A6_41C0_ED3FC9EC6306_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC99DE13_A93D_CAF6_41A4_C8A776EC4E48",
 "levels": [
  {
   "url": "media/panorama_ADB3D7F0_A732_4066_41D0_840464573FEC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC905E16_A93D_CAFE_41A2_3D11704CD4BD",
 "levels": [
  {
   "url": "media/panorama_AD4103F5_A732_C06F_415C_0C084836D4FB_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 1350
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC92AE15_A93D_CAF2_41BB_BBED49B4CAA2",
 "levels": [
  {
   "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC932E15_A93D_CAF2_41D8_DEC76C99037F",
 "levels": [
  {
   "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C41FCF49_A9D6_4953_41D6_FA09EBB06186",
 "levels": [
  {
   "url": "media/panorama_AD4113EC_A732_C07D_41AA_AFA295EFE59B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_39710CCB_A8F2_4F56_41E2_5B37389A760F",
 "levels": [
  {
   "url": "media/panorama_ADB19940_A732_41A6_41CE_69940E32F586_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCADAE0E_A93D_CAEE_41E4_D599E68EFF5B",
 "levels": [
  {
   "url": "media/panorama_ADBD7E89_A732_40A7_41D3_08120DEBEA3A_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7A922CCE_EB73_DAC5_41AB_BE4BA08CE6CC",
 "levels": [
  {
   "url": "media/panorama_0D28AF26_EB52_5745_41D3_4A44C1E94223_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC998E14_A93D_CAF2_41BC_90E68AA133DE",
 "levels": [
  {
   "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9E0E14_A93D_CAF2_41DA_9670E54DE501",
 "levels": [
  {
   "url": "media/panorama_ADB6C12E_A732_41FA_41E0_1799D15BA48B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8A6E19_A93D_CAF2_41E3_073978A73D11",
 "levels": [
  {
   "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8AEE19_A93D_CAF2_41D8_E4C120254416",
 "levels": [
  {
   "url": "media/panorama_ADA9CB8B_A732_40BA_41B9_9A2C51EDD984_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC958E18_A93D_CAF2_41D1_7C45445F6716",
 "levels": [
  {
   "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC94EE18_A93D_CAF2_41E0_842985D82DFC",
 "levels": [
  {
   "url": "media/panorama_ADAB8297_A732_40AA_41E0_30FC77E5063F_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA66E10_A93D_CAF2_41C7_07BFD9480D8E",
 "levels": [
  {
   "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA69E10_A93D_CAF2_41C8_DF26F91EDA60",
 "levels": [
  {
   "url": "media/panorama_AD461A04_A733_C3AE_41AD_5DC1F9E7535B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC992E13_A93D_CAF6_41C8_AAE29905CF79",
 "levels": [
  {
   "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC995E13_A93D_CAF6_41E2_F25BCEF1027C",
 "levels": [
  {
   "url": "media/panorama_ADA963A2_A732_40EA_41E1_4EED3759DFB6_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9CBE15_A93D_CAF2_41E4_795705BF0556",
 "levels": [
  {
   "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9D2E15_A93D_CAF2_41D1_3477A7AA39B4",
 "levels": [
  {
   "url": "media/panorama_ADADC7BF_A732_C0DA_419D_2F0DCFD5A0F3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCABFE0C_A93D_CAD2_41E0_6E06E5194867",
 "levels": [
  {
   "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA81E0C_A93D_CAD2_41C3_6F0D4E44AF61",
 "levels": [
  {
   "url": "media/panorama_AD42FA62_A732_406A_41C3_227D74703849_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA58E11_A93D_CAF2_41E3_99C6515459F5",
 "levels": [
  {
   "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9A3E12_A93D_CAF6_41DE_CAE9B429988B",
 "levels": [
  {
   "url": "media/panorama_ADB53D0F_A732_41BB_41CE_141DAA2AAC38_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA0EE10_A93D_CAF2_41D1_7765B928F447",
 "levels": [
  {
   "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA17E10_A93D_CAF2_41E4_CDF1B04A9FBA",
 "levels": [
  {
   "url": "media/panorama_ADB7E26B_A733_C07A_41D0_353E50432948_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8CAE1B_A93D_CAF6_41E2_54A3E2C99BC8",
 "levels": [
  {
   "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8D2E1B_A93D_CAF6_41D0_8791A4DFAE28",
 "levels": [
  {
   "url": "media/panorama_ADB72FB1_A732_40E6_41DD_B1F4A0E28B56_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC9DAE15_A93D_CAF2_41D5_408687CCFE3B",
 "levels": [
  {
   "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC922E15_A93D_CAF2_41AD_67845C9F1883",
 "levels": [
  {
   "url": "media/panorama_ADAB2C46_A732_C7AA_41D1_5397A8BE1AA4_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC81EE1D_A93D_CAF2_41DE_A653FDC4D25D",
 "levels": [
  {
   "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC862E1D_A93D_CAF2_41CF_820C12B20814",
 "levels": [
  {
   "url": "media/panorama_FC97A89A_A8D2_D7F1_41DD_37465D8A108B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C57A2DEE_A932_492E_4176_EA619EB1D132",
 "levels": [
  {
   "url": "media/panorama_ADB24E65_A732_406E_41C7_08796165960B_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DACC08B5_A94D_F733_417C_3FA3271FFE8F",
 "levels": [
  {
   "url": "media/panorama_ADB61C74_A732_406E_41DA_59C71F06A5AD_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAC6E0D_A93D_CAD2_41B2_1546E9E2D2BD",
 "levels": [
  {
   "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCACEE0D_A93D_CAD2_41E5_1D4D5990804E",
 "levels": [
  {
   "url": "media/panorama_ADB099BA_A732_40E5_41A8_B96446AC21A8_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2EDAC5C7_A8D2_795F_41C7_F7F903ED2B0C",
 "levels": [
  {
   "url": "media/panorama_ADBC0A15_A732_43AE_41C7_61EDECA05085_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2E51CBE5_B8F2_4953_41E2_7E98F76E7D02",
 "levels": [
  {
   "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2E514BE6_B8F2_4951_41D2_BE4348636A7D",
 "levels": [
  {
   "url": "media/panorama_ADB0C5C5_A733_C0AF_41C4_DEB7AD6EE5EC_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8F2E1B_A93D_CAF6_419E_F83405F4EC3C",
 "levels": [
  {
   "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8FBE1B_A93D_CAF6_41D7_006649C70E0A",
 "levels": [
  {
   "url": "media/panorama_ADB5DB20_A732_41E6_41E1_7E9DA1F97D7B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC8DCE1C_A93D_CAF2_41E3_258108F4FAC2",
 "levels": [
  {
   "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC825E1C_A93D_CAF2_41CD_ECD50E2100EA",
 "levels": [
  {
   "url": "media/panorama_ADB7D3C7_A732_40AA_41B2_61881136ED3B_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DC950E18_A93D_CAF2_41D4_67CFD7A69688",
 "levels": [
  {
   "url": "media/panorama_ADA94E46_A732_C3AD_41AD_6EB257048DA1_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCA20E0E_A93D_CAEE_41DA_C24ADA6FB2DB",
 "levels": [
  {
   "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DCAD0E0E_A93D_CAEE_41E4_98AAC2A0EFDF",
 "levels": [
  {
   "url": "media/panorama_ADB20347_A733_C1AA_41DC_6FD22EC36834_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 60,
 "propagateClick": true,
 "id": "IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 120,
 "minHeight": 1,
 "horizontalAlign": "left",
 "iconURL": "skin/IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "if(!this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51.get('visible')){ this.setComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, true, 0, this.effect_76B7CFD8_EBD6_56CE_41BB_7B0601763FC6, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9E6FB30B_A972_7AD7_41B5_08782ADDCC51, false, 0, this.effect_76B7FFD8_EBD6_56CE_41C5_93044947B380, 'hideEffect', false) }",
 "height": 80,
 "rollOverIconURL": "skin/IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07_rollover.png",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_9E6FA30A_A972_7AD1_4178_4D493D808D07_pressed.png",
 "class": "IconButton",
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "image button menu"
 }
}],
 "width": "100%",
 "data": {
  "name": "Player435"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
