                        _ = function (h, k, t) { // Math: sum, mean, variance^2, variance, standardize, outlier
                                var _h = h instanceof Array; var _k = k instanceof Array;

                                if ((!_h && !_k) || (_k && _h)) return void 0; // must not return bool as would confuse
                                else if (_k && !_h)(_k = k, k = h, h = _k);

                                var s = 0, v = []; (k && h.push(k)); var _s = h.length;

                                var t = t || 0; var k = k || 0;

                                if (_s < 8) return false;

                                // sum
                                for (var i = 0; i < _s; ++i) v.push(h[i]), (s += v[i]);
                                if ( t == 1 ) return s;

                                // mean
                                var m = s / _s;
                                if ( t == 2 ) return m;

                                // variance^2
                                for (var i = 0, _v = 0; i < _s; ++i) _v += Math.pow((v[i] - m), 2); _v = _v / _s;
				if ( t == 3 ) return _v;

                                // variance
                                var sD = Math.sqrt(_v);
                                if ( t == 4 ) return sD;

                                // standardize
                                for (i = 0; i < _s; ++i) v[i] = (v[i] - m) / sD;
                                if ( t == 5 ) return v;

                                // quickcheck: outlier?
                                dRange = 2.0;

                                return k ? ((k_ = v.pop()), (k_ > dRange || k_ < -dRange)) : v;
                        }