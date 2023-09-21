var IdSet = (function () {
    function IdSet() {
        this._items = {};
        this._size = 0;
    }

    IdSet.VERSION = "0.3.0";

    IdSet.from = function (o) {
        if (o instanceof IdSet) {
            return o.clone();
        }
        var ret = new IdSet();
        if (Array.isArray(o)) {
            o.forEach(function (e) {
                ret.add(e);
            });
        } else {
            ret.add(o);
        }
        return ret;
    }

    IdSet._wrap = function (o) {
        if (o instanceof IdSet) {
            return o;
        }
        return IdSet.from(o);
    }

    IdSet.prototype = {
        constructor: IdSet,

        add: function (e) {
            var k = this._keyOf(e);
            if (this._accept(k) && !this._has(k)) {
                this._store(k, e);
                ++this._size;
            }
            return this;
        },
        remove: function (e) {
            var k = this._keyOf(e);
            if (this._accept(k) && this._has(k)) {
                this._drop(k);
                --this._size;
            }
            return this;
        },
        contains: function (e) {
            var k = this._keyOf(e);
            return this._accept(k) && this._has(k);
        },
        clear: function () {
            this._items = {};
            this._size = 0;
        },
        size: function () {
            return this._size;
        },
        isEmpty: function () {
            return !this._size;
        },
        allIn: function (c) {
            return this.isSubset(c);
        },
        allNotIn: function (c) {
            return this.isDisjoint(c);
        },
        forEach: function (fn, thisArg) {
            thisArg = thisArg || this;
            for (var k in this._items) {
                // compatibles with the behavior of continuing traversal without a return value
                if (this._has(k) && fn.call(thisArg, this._load(k), thisArg) === false) {
                    return false;
                }
            }
            return true;
        },
        filter: function (fn, thisArg) {
            var ret = new IdSet();
            this.forEach(function (e) {
                fn.call(this, e, this) && ret.add(e);
            }, thisArg || this);
            return ret;
        },
        map: function (fn, thisArg) {
            var ret = new IdSet();
            this.forEach(function (e) {
                ret.add(fn.call(this, e, this));
            }, thisArg || this);
            return ret;
        },
        reduce: function (fn, initialValue) {
            var ret = initialValue, direct = initialValue === void 0;
            this.forEach(function (e) {
                if (direct) {
                    ret = e;
                    direct = false;
                } else {
                    ret = fn.call(this, ret, e, this);
                }
            });
            return ret;
        },
        every: function (fn, thisArg) {
            return this.forEach(function (e) {
                return !!fn.call(this, e, this);
            }, thisArg || this);
        },
        some: function (fn, thisArg) {
            return !this.forEach(function (e) {
                return !fn.call(this, e, this);
            }, thisArg || this);
        },
        intersection: function (c) {
            var ret = new IdSet();
            IdSet._wrap(c).forEach(function (e) {
                if (this.contains(e)) {
                    ret.add(e);
                }
            }, this);
            return ret;
        },
        union: function (c) {
            var ret = IdSet.from(c);
            this.forEach(function (e) {
                ret.add(e);
            });
            return ret;
        },
        difference: function (c) {
            var ret = new IdSet();
            this.forEach(function (e) {
                if (!this.contains(e)) {
                    ret.add(e);
                }
            }, IdSet._wrap(c));
            return ret;
        },
        symmetricDifference: function (c) {
            var ret = new IdSet();
            var other = IdSet._wrap(c);
            this.forEach(function (e) {
                if (!this.contains(e)) {
                    ret.add(e);
                }
            }, other);
            other.forEach(function (e) {
                if (!this.contains(e)) {
                    ret.add(e);
                }
            }, this);
            return ret;
        },
        isDisjoint: function (c) {
            return this.intersection(c).size() === 0;
        },
        isSubset: function (c) {
            return this.intersection(c).size() === this._size;
        },
        isStrictSubset: function (c) {
            c = IdSet._wrap(c);
            return this.intersection(c).size() === this._size && c.size() !== this._size;
        },
        isSuperset: function (c) {
            return IdSet._wrap(c).isSubset(this);
        },
        isStrictSuperset: function (c) {
            c = IdSet._wrap(c);
            return c.isSubset(this) && c.size() !== this._size;
        },
        toArray: function () {
            var ret = [];
            this.forEach(function (e) {
                ret.push(e);
            });
            return ret;
        },
        clone: function () {
            var ret = new IdSet();
            this.forEach(function (e) {
                ret.add(e);
            });
            return ret;
        },
        equals: function (o) {
            if (!(o instanceof IdSet && this._size === o.size())) {
                return false;
            }
            return this.every(function (e) {
                return o.contains(e);
            });
        },
        toString: function () {
            return JSON.stringify(this.toArray());
        },
        
        // overridable low-level R/W interfaces
        // keyOf-> accept -> has -> store / drop / load
        _keyOf: function (e) {
            switch (typeof e) {
                case "string": return "S" + e;
                case "number": return "N" + String(e);
                default: return null;
            }
        },
        _accept: function (k) {
            return !!k;
        },
        _has: function (k) {
            return this._items[k] !== void 0;
        },
        _store: function (k, e) {
            this._items[k] = {value: e};
        },
        _load: function (k) {
            return this._items[k].value;
        },
        _drop: function (k) {
            this._items[k] = void 0;
        }
    };

    return IdSet;
})();