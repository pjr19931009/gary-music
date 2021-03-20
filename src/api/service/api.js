import request from './instance.js'
// 热搜列表(简略)
export const hotKeyWords = () => {
  return request.get('/search/hot')
}
// 获取banner图
export const banner = () => {
  return request.get('/banner?type=0')
}
// 推荐歌单
export const recommendSongList = params => {
  return request.get(`/personalized`, params)
}
// 推荐新歌
export const recommendNewSong = params => {
  return request.get('/personalized/newsong', params)
}
/**
 * @description: 推荐歌手
 * @param offset {可选参数} 偏移数量 , 用于分页
 * @param limit {可选参数} :取出数量 , 默认为 50   如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
export const recommendSingerList = params => {
  return request.get('/top/artists', params)
}

//传入音乐 id 取url  ?id=347230,347231
export const getSongUrl = params => {
  return request.get('/song/url', params)
}

//传入的音乐 id 取歌词
export const getLyric = params => {
  return request.get('/lyric', params)
}

//传入音乐的id  获取歌曲详情 ?ids=347230,347231
export const getSongDesc = params => {
  return request.get('/song/detail', params)
}
//排行榜
export const topList = () => {
  return request.get('/toplist')
}
// 歌单分类
export const catList = () => {
  return request.get('/playlist/catlist')
}
// 热门歌单分类
export const hotList = () => {
  return request.get('/playlist/hot')
}
/**
 * @description: 获取歌单 /top/playlist?limit=10&order=new
 * @param cat {可选参数} tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",
 * @param limit {可选参数,Number} 取出歌单数量 , 默认为 50
 * @param order {可选参数}可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param offset {可选参数}偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export const playList = params => {
  return request.get('/top/playlist', params)
}
/**
 * @description: 歌手分类列表
 * @param limit  {可选参数} 返回数量 , 默认为 30
 * @param offset {可选参数} 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param initial {可选参数}
 * @param type 取值:-1:全部 1:男歌手 2:女歌手 3:乐队按首字母索引查找参数 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
 * @param area  取值:-1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 */
export const singerList = params => {
  return request.get('/artist/list', params)
}

/**
 * @description:全部 mv
 * @param area {可选参数} 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param type {可选参数} 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param order {可选参数} 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param limit {可选参数} 取出数量 , 默认为 30
 * @param offset {可选参数} 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 *
 */
export const mvList = params => {
  return request.get('/mv/all', params)
}

export const playlistDetail = params => {
  return request.get('/playlist/detail', params)
}
export const recommendedRelatedPlaylists = params => {
  return request.get('/related/playlist', params)
}
export const playlistComment = params => {
  return request.get('/comment/playlist', params)
}
//获取歌手详情
export const artistDetail = params => {
  return request.get('/artist/detail', params)
}
//歌手热门50首歌曲
export const artistTopSongs = params => {
  return request.get('/artist/top/song', params)
}
//歌手专辑
export const artAlbum = params => {
  return request.get('/artist/album', params)
}
//相似歌手
export const simiArt = params => {
  return request.get('/simi/artist', params)
}
//获取歌手 mv
export const artMV = params => {
  return request.get('/artist/mv', params)
}
//获取 mv 数据
export const mvData = params => {
  return request.get(`/mv/detail`, params)
}
//mv 地址
export const mvLink = params => {
  return request.get(`/mv/url`, params)
}
//mv 评论
export const commentMV = params => {
  return request.get(`/comment/mv`, params)
}
// 相似mv
export const simiMV = params => {
  return request.get(`/simi/mv`, params)
}
// 搜索
export const cloudSearch = params => {
  return request.get(`/cloudsearch`, params)
}
//用户信息
export const userData = params => {
  return request.get('/user/detail', params)
}
//获取用户歌单
export const userPlaylist = params => {
  return request.get('/user/playlist', params)
}
//用户粉丝
export const userFolloweds = params => {
  return request.get('/user/followeds', params)
}
