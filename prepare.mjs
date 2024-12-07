import partition from 'partition-array'
import Read from '@rubenrodriguez/georender-style2png/read'
import { PrepareText } from './text'
import defined from '@/lib/defined'

export default function Prepare(opts) {
  if (!(this instanceof Prepare)) return new Prepare(opts)
  this.style = opts.styleTexture
  this.pixels = opts.stylePixels
  this.data = opts.decoded
  this.zoomCount = opts.zoomEnd - opts.zoomStart
  this.imageSize = opts.imageSize
  this.label = opts.label && new PrepareText({ ...opts.label, style: this.pixels })
  this.styleRead = Read({
    pixels: this.pixels,
    zoomCount: this.zoomCount,
    imageWidth: this.imageSize[0]
  })
  this.indexes = {
    point: new Uint32Array(this.data.point.types.length),
    line: new Uint32Array(this.data.line.types.length),
    area: new Uint32Array(this.data.area.types.length),
    areaBorder: new Uint32Array(this.data.areaBorder.types.length)
  }
  for (var i=0; i<this.indexes.point.length; i++) {
    this.indexes.point[i] = i 
  }
  for (var i=0; i<this.indexes.line.length; i++) {
    this.indexes.line[i] = i 
  }
  for (var i=0; i<this.indexes.area.length; i++) {
    this.indexes.area[i] = i 
  }
  for (var i=0; i<this.indexes.areaBorder.length; i++) {
    this.indexes.areaBorder[i] = i
  }
  var pointIndexes = makeIndexes(this.data.point.ids)
  var lineIndexes = makeIndexes(this.data.line.ids)
  var areaIndexes = makeIndexes(this.data.area.ids)
  var areaBorderIndexes = makeIndexes(this.data.areaBorder.ids)
  this.ldistances = [0,0]
  var ldistx = 0
  var ldisty = 0
  var lids = this.data.line.ids
  var lposits = this.data.line.positions
  for (var i=0;i<lids.length-1;i++){
    if (lids[i] === lids[i+1]) {
      ldistx += Math.abs(lposits[2*i] - lposits[2*i+2])
      ldisty += Math.abs(lposits[2*i+1] - lposits[2*i+3])
    }
    else {
      ldistx = 0
      ldisty = 0
    }
    if (isNaN(ldistx) || isNaN(ldisty)){
      ldistx = 0
      ldisty = 0
    }
    this.ldistances.push(ldistx, ldisty)
  }

  this.abdistances = [0,0]
  var abdistx = 0
  var abdisty = 0
  var abids = this.data.areaBorder.ids
  var abposits = this.data.areaBorder.positions
  for (var i=0;i<abids.length-1;i++){
    if (abids[i] === abids[i+1]) {
      abdistx += Math.abs(abposits[2*i] - abposits[2*i+2])
      abdisty += Math.abs(abposits[2*i+1] - abposits[2*i+3])
    }
    else {
      abdistx = 0
      abdisty = 0
    }
    if (isNaN(abdistx) || isNaN(abdisty)){
      abdistx = 0
      abdisty = 0
    }
    this.abdistances.push(abdistx, abdisty)
  }

  // additional attributes that a use can expand core georender data
  // with. this comes in the shape of attrKey : size, for example, if we
  // have population values on the point, we would define that as 
  // this.attributes.point.population = 1
  // if it were a vec2 we were going to save, the value would be 2
  // 3 for vec3 and 4 for vec4.
  this.attributes = {
    point: {},
    line: {},
    area: {},
    areaBorder: {},
  }

  this.props = {
    point: {
      positions: null,
      types: null,
      id: null,
      indexes: pointIndexes.indexes,
      indexToId: pointIndexes.indexToId,
      idToIndex: pointIndexes.idToIndex,
      labels: this.data.point.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    pointT: {
      positions: null,
      types: null,
      id: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      labels: this.data.point.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    pointP: {
      positions: null,
      types: null,
      id: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      labels: this.data.point.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    line: {
      positions: null,
      types: null,
      id: null,
      normals: this.data.line.normals,
      distances: this.ldistances,
      indexes: lineIndexes.indexes,
      indexToId: lineIndexes.indexToId,
      idToIndex: lineIndexes.idToIndex,
      labels: this.data.line.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    lineT: {
      positions: null,
      types: null,
      id: null,
      normals: null,
      distances: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      labels: this.data.line.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    lineP: {
      positions: null,
      types: null,
      id: null,
      normals: null,
      distances: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      labels: this.data.line.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    area: {
      positions: this.data.area.positions,
      types: this.data.area.types,
      indexes: areaIndexes.indexes,
      id: this.data.area.ids,
      indexToId: areaIndexes.indexToId,
      idToIndex: areaIndexes.idToIndex,
      cells: this.data.area.cells,
      labels: this.data.area.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    areaT: {
      positions: this.data.area.positions,
      types: this.data.area.types,
      indexes: areaIndexes.indexes,
      id: this.data.area.ids,
      indexToId: areaIndexes.indexToId,
      idToIndex: areaIndexes.idToIndex,
      cells: null,
      labels: this.data.area.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    areaP: {
      positions: this.data.area.positions,
      types: this.data.area.types,
      indexes: areaIndexes.indexes,
      id: this.data.area.ids,
      indexToId: areaIndexes.indexToId,
      idToIndex: areaIndexes.idToIndex,
      cells: null,
      labels: this.data.area.labels,
      style: this.style,
      imageSize: this.imageSize,
    },
    areaBorder: {
      positions: null,
      types: null,
      id: null,
      normals: this.data.areaBorder.normals,
      distances: this.abdistances,
      //indexes: areaBorderIndexes.indexes,
      //indexToId: areaBorderIndexes.indexToId,
      //idToIndex: areaBorderIndexes.idToIndex,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      style: this.style,
      imageSize: this.imageSize,
    },
    areaBorderT: {
      positions: null,
      types: null,
      id: null,
      normals: null,
      distances: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      style: this.style,
      imageSize: this.imageSize,
    },
    areaBorderP: {
      positions: null,
      types: null,
      id: null,
      normals: null,
      distances: null,
      indexes: null,
      indexToId: null,
      idToIndex: null,
      style: this.style,
      imageSize: this.imageSize,
    },
    label: {
      labelEngine: null,
      atlas: [],
      glyphs: [],
    }
  }

  if (typeof opts.extend === 'function') opts.extend(this.attributes, this.props)
}
Prepare.prototype._splitSort = function (key, zoom) {
  var self = this
  var tkey = key+'T'
  var pkey = key+'P'
  var splitT = partition(this.indexes[key], function (i) {
    var opacity = self.styleRead.opacity(key, self.data[key].types[i], zoom)
    return opacity > 100
  })
  this.indexes[tkey] = this.indexes[key].subarray(0, splitT)
  this.indexes[pkey] = this.indexes[key].subarray(splitT)
  this.indexes[tkey].sort(function (a, b) {
    var xa = self.data[key].types[a]
    var xb = self.data[key].types[b]
    var zindexa = self.styleRead.zindex(key, xa, zoom)
    var zindexb = self.styleRead.zindex(key, xb, zoom)
    return zindexa - zindexb
  })
  self.props[tkey].id = []
  self.props[tkey].types = []
  self.props[tkey].positions = []
  self.props[pkey].id = []
  self.props[pkey].types = []
  self.props[pkey].positions = []
  if (self.props[key].normals) {
    self.props[tkey].normals = []
    self.props[pkey].normals = []
  }
  if (self.props[key].distances) {
    self.props[tkey].distances = []
    self.props[pkey].distances = []
  }
  const spreadExtendedForKey = categorizeAttributes(this.attributes[key])
  const spreadExtendedTkey = spreadExtendedForKey(tkey)
  for (var i=0; i<self.indexes[tkey].length; i++) {
    self.props[tkey].id.push(self.data[key].ids[self.indexes[tkey][i]])
    self.props[tkey].types.push(self.data[key].types[self.indexes[tkey][i]])
    self.props[tkey].positions.push(self.data[key].positions[self.indexes[tkey][i]*2])
    self.props[tkey].positions.push(self.data[key].positions[self.indexes[tkey][i]*2+1])
    if (self.props[key].normals) {
      self.props[tkey].normals.push(self.data[key].normals[self.indexes[tkey][i]*2])
      self.props[tkey].normals.push(self.data[key].normals[self.indexes[tkey][i]*2+1])
    }
    if (self.props[key].distances) {
      if (key === 'line') {
        self.props[tkey].distances.push(this.ldistances[self.indexes[tkey][i]*2])
        self.props[tkey].distances.push(this.ldistances[self.indexes[tkey][i]*2+1])
      }
      else if (key === 'areaBorder') {
        self.props[tkey].distances.push(this.abdistances[self.indexes[tkey][i]*2])
        self.props[tkey].distances.push(this.abdistances[self.indexes[tkey][i]*2+1])
      }
    }
    spreadExtendedTkey(i)
  }
  const spreadExtendedPkey = spreadExtendedForKey(pkey)
  for (var i=0; i<self.indexes[pkey].length; i++) {
    self.props[pkey].id.push(self.data[key].ids[self.indexes[pkey][i]])
    self.props[pkey].types.push(self.data[key].types[self.indexes[pkey][i]])
    self.props[pkey].positions.push(self.data[key].positions[self.indexes[pkey][i]*2])
    self.props[pkey].positions.push(self.data[key].positions[self.indexes[pkey][i]*2+1])
    if (self.props[pkey].normals) {
      self.props[pkey].normals.push(self.data[key].normals[self.indexes[pkey][i]*2])
      self.props[pkey].normals.push(self.data[key].normals[self.indexes[pkey][i]*2+1])
    }
    if (self.props[key].distances) {
      if (key === 'line') {
        self.props[pkey].distances.push(this.ldistances[self.indexes[pkey][i]*2])
        self.props[pkey].distances.push(this.ldistances[self.indexes[pkey][i]*2+1])
      }
      else if (key === 'areaBorder') {
        self.props[pkey].distances.push(this.abdistances[self.indexes[pkey][i]*2])
        self.props[pkey].distances.push(this.abdistances[self.indexes[pkey][i]*2+1])
      }
    }
    spreadExtendedPkey(i)
  }
  //figure out area line indexes
  var tindexes = makeIndexes(self.props[tkey].id)
  var pindexes = makeIndexes(self.props[pkey].id)
  self.props[tkey].indexes = tindexes.indexes
  self.props[tkey].indexToId = tindexes.indexToId
  self.props[tkey].idToIndex = tindexes.idToIndex
  self.props[pkey].indexes = pindexes.indexes
  self.props[pkey].indexToId = pindexes.indexToId
  self.props[pkey].idToIndex = pindexes.idToIndex

  // extended attributes
  function categorizeAttributes (attr) {
    const len1attr = []
    const len2attr = []
    const len3attr = []
    const len4attr = []

    for (const attrKey in attr) {
      self.props[tkey][attrKey] = []
      self.props[pkey][attrKey] = []

      const len = attr[attrKey]
      if (len === 1) len1attr.push(attrKey)
      if (len === 2) len2attr.push(attrKey)
      if (len === 3) len3attr.push(attrKey)
      if (len === 4) len4attr.push(attrKey)
    }

    const len1spread = (ckey) => (i) => {
      for (const attrKey of len1attr) {
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]])
      }
    }
    const len2spread = (ckey) => (i) => {
      for (const attrKey of len2attr) {
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*2])
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*2+1])
      }
    }
    const len3spread = (ckey) => (i) => {
      for (const attrKey of len3attr) {
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*3])
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*3+1])
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*3+2])
      }
    }
    const len4spread = (ckey) => (i) => {
      for (const attrKey of len4attr) {
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*4])
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*4+1])
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*4+2])
        self.props[ckey][attrKey].push(self.data[key][attrKey][self.indexes[ckey][i]*4+3])
      }
    }

    return (ckey) => {
      const spreaders = []
      if (len1attr.length > 0) spreaders.push(len1spread(ckey))
      if (len2attr.length > 0) spreaders.push(len2spread(ckey))
      if (len3attr.length > 0) spreaders.push(len3spread(ckey))
      if (len4attr.length > 0) spreaders.push(len4spread(ckey))
      return (i) => {
        for (const spreader of spreaders) {
          spreader(i)
        }
      }
    }
  }
}

Prepare.prototype._splitSortArea = function (key, zoom) {
  var self = this
  var tkey = key+'T'
  var pkey = key+'P'
  self.props[tkey].cells = []
  self.props[pkey].cells = []
  var cells = self.data[key].cells
  for (var i=0; i<cells.length; i+=3) {
    var type = self.data[key].types[cells[i]]
    var opacity = self.styleRead.opacity(key, type, zoom)
    if (opacity < 100) {
      self.props[tkey].cells.push(cells[i], cells[i+1], cells[i+2])
    }
    else {
      self.props[pkey].cells.push(cells[i], cells[i+1], cells[i+2])
    }
  }
}

Prepare.prototype.update = function (map) {
  const zoom = Math.round(map.getZoom())
  var self = this
  this._splitSort('point', zoom)
  this._splitSort('line', zoom)
  this._splitSort('areaBorder', zoom)
  this._splitSortArea('area', zoom)
  if (this.label) {
    this.props.label = this.label.update(this.props, map, { style: this.pixels })
  }
  return this.props
}

function makeIndexes (ids) { 
  var indexToId = {}
  var idToIndex = {}
  var indexes = new Float32Array(ids.length)
  var x = 1
  ids.forEach(function (id) {
    if (!idToIndex.hasOwnProperty(id)) {
      idToIndex[id] = x
      indexToId[x] = id
      x++
    }
  })
  ids.forEach(function (id, i) {
    indexes[i] = idToIndex[id]
  })
  return {
    indexes: indexes,
    idToIndex: idToIndex,
    indexToId: indexToId
  }
}

function identity (x) { return x }
