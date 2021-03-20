/**
 * @description: 解析lrc歌词
 * @param str {String} 歌词字符串

 */
export function parseLyrics(str) {
  // 解析lrc
  let allTextLines = ''
  let lyrics = []
  let tim = []
  let line = ' '
  let allText = str
  function processData(allText) {
    // 只会根据新行划分
    allTextLines = allText.split(/\r\n|\n/)
    next()
  }
  function next() {
    for (let i = 0; i < allTextLines.length; i++) {
      if (allTextLines[i].search(/^(\[)(\d*)(:)(.*)(\])(.*)/i) >= 0) {
        // 任何没有指定格式的行都不会进入这个循环
        line = allTextLines[i].match(/^(\[)(\d*)(:)(.*)(\])(.*)/i)
        tim[i] = parseInt(line[2]) * 60 + parseInt(line[4]) // 时间/秒
        lyrics[i] = line[6] //lyc数组
      }
    }
  }

  processData(allText)
  return {
    tim,
    line,
    lyrics
  }
}

/**
 * @description: 解析歌手对象数组 提取歌手name 多个歌手解析为 name1/name2/name3
 * @param arr {Array}
 */

export function artName(arr) {
  let nameArr = arr || []
  if (nameArr) {
    nameArr = nameArr
      .reduce((pre, next) => {
        return pre + '/' + next.name
      }, '')
      .replace('/', '')
  }
  return nameArr
}

// 整理获得的歌曲数组 筛选id name picUrl artists album
export function songFilter(list) {
  list = list.map(item => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      art: item.song.artists,
      album: item.song.album,
      duration: Math.floor(item.song.duration / 1000)
    }
  })
  // 防止对象循环引用
  list = assignSongList(list)
  return list
}

export function assignSongList(list) {
  let temObj = {}
  list = list.map(item => {
    temObj = Object.assign({}, item)
    temObj.songList = list
    return temObj
  })
  return list
}

// 筛选排行榜数据
export function rankData(dataArr) {
  return dataArr.map(item => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.coverImgUrl,
      createTime: item.createTime,
      description: item.description,
      updateFrequency: item.updateFrequency,
      updateTime: item.updateTime,
      playCount: item.playCount
    }
  })
}

// 筛选数组里的对象生成新的对象ID数组

export function getIds(dataArr) {
  return dataArr.map(item => {
    return item.id
  })
}
