window.CodeMirror = function() {
    "use strict";
    function e(r, i) {
        function ln(e) {
            if (s.onDragEvent && s.onDragEvent(dn, $(e))) return;
            Q(e)
        }
        function pn(e) {
            return e >= 0 && e < _t.size
        }
        function vn(e) {
            return R(_t, e)
        }
        function mn(e, t) {
            Kt = !0;
            var n = t - e.height;
            for (var r = e; r; r = r.parent) r.height += n
        }
        function gn(e, t) {
            return e.styles || e.highlight(Mt, e.stateAfter = ui(U(e)), s.tabSize),
                e.getContent(s.tabSize, t, s.lineWrapping)
        }
        function yn(e) {
            var t = {
                line: 0,
                ch: 0
            };
            Bn(t, {
                    line: _t.size - 1,
                    ch: vn(_t.size - 1).text.length
                },
                xt(e), t, t),
                Wt = !0
        }
        function bn(e) {
            var t = [];
            return _t.iter(0, _t.size,
                function(e) {
                    t.push(e.text)
                }),
                t.join(e || "\n")
        }
        function wn(e) {
            A.scrollTop != It && (It = Ct.scrollTop = A.scrollTop, or([]))
        }
        function En(e) {
            s.fixedGutter && ot.style.left != Ct.scrollLeft + "px" && (ot.style.left = Ct.scrollLeft + "px"),
                Ct.scrollTop != It && (It = Ct.scrollTop, A.scrollTop != It && (A.scrollTop = It), or([])),
                s.onScroll && s.onScroll(dn)
        }
        function Sn(e) {
            function u(t) {
                y && (Ct.draggable = !1),
                    qt = !1,
                    l(),
                    c(),
                    Math.abs(e.clientX - t.clientX) + Math.abs(e.clientY - t.clientY) < 10 && (J(t), vr(n.line, n.ch, !0), er())
            }
            function m(e) {
                if (i == "single") hr(n, e);
                else if (i == "double") {
                    var t = Sr(e);
                    dt(e, h) ? hr(t.from, v) : hr(h, t.to)
                } else i == "triple" && (dt(e, h) ? hr(v, gr({
                    line: e.line,
                    ch: 0
                })) : hr(h, gr({
                    line: e.line + 1,
                    ch: 0
                })))
            }
            function g(e) {
                var t = ei(e, !0);
                if (t && !pt(t, a)) {
                    Pt || Pn(),
                        a = t,
                        m(t),
                        Wt = !1;
                    var n = sr();
                    if (t.line >= n.to || t.line < n.from) f = setTimeout(pi(function() {
                        g(e)
                    }), 150)
                }
            }
            function b(e) {
                clearTimeout(f);
                var t = ei(e);
                t && m(t),
                    J(e),
                    er(),
                    Wt = !0,
                    w(),
                    l()
            }
            cr(Z(e, "shiftKey"));
            for (var t = G(e); t != kt; t = t.parentNode) if (t.parentNode == bt && t != ft) return;
            for (var t = G(e); t != kt; t = t.parentNode) if (t.parentNode == it) return s.onGutterClick && s.onGutterClick(dn, Et(it.childNodes, t) + Yt, e),
                J(e);
            var n = ei(e);
            switch (Y(e)) {
                case 3:
                    p && ni(e);
                    return;
                case 2:
                    n && vr(n.line, n.ch, !0),
                        setTimeout(er, 20),
                        J(e);
                    return
            }
            if (!n) {
                G(e) == Ct && J(e);
                return
            }
            Pt || Pn();
            var r = +(new Date),
                i = "single";
            if (Ft && Ft.time > r - 400 && pt(Ft.pos, n)) i = "triple",
                J(e),
                setTimeout(er, 20),
                xr(n.line);
            else if (jt && jt.time > r - 400 && pt(jt.pos, n)) {
                i = "double",
                    Ft = {
                        time: r,
                        pos: n
                    },
                    J(e);
                var o = Sr(n);
                hr(o.from, o.to)
            } else jt = {
                time: r,
                pos: n
            };
            var a = n,
                f;
            if (s.dragDrop && rt && !s.readOnly && !pt(Ht.from, Ht.to) && !dt(n, Ht.from) && !dt(Ht.to, n) && i == "single") {
                y && (Ct.draggable = !0);
                var l = et(document, "mouseup", pi(u), !0),
                    c = et(Ct, "drop", pi(u), !0);
                qt = !0,
                    Ct.dragDrop && Ct.dragDrop();
                return
            }
            J(e),
                i == "single" && vr(n.line, n.ch, !0);
            var h = Ht.from,
                v = Ht.to,
                w = et(document, "mousemove", pi(function(e) {
                    clearTimeout(f),
                        J(e),
                        !d && !Y(e) ? b(e) : g(e)
                }), !0),
                l = et(document, "mouseup", pi(b), !0)
        }
        function xn(e) {
            for (var t = G(e); t != kt; t = t.parentNode) if (t.parentNode == it) return J(e);
            J(e)
        }
        function Tn(e) {
            if (s.onDragEvent && s.onDragEvent(dn, $(e))) return;
            J(e);
            var t = ei(e, !0),
                n = e.dataTransfer.files;
            if (!t || s.readOnly) return;
            if (n && n.length && window.FileReader && window.File) {
                var r = n.length,
                    i = Array(r),
                    o = 0,
                    u = function(e, n) {
                        var s = new FileReader;
                        s.onload = function() {
                            i[n] = s.result,
                                ++o == r && (t = gr(t), pi(function() {
                                    var e = Wn(i.join(""), t, t);
                                    hr(t, e)
                                })())
                        },
                            s.readAsText(e)
                    };
                for (var a = 0; a < r; ++a) u(n[a], a)
            } else {
                if (qt && !dt(t, Ht.from) && !dt(Ht.to, t)) return;
                try {
                    var i = e.dataTransfer.getData("Text");
                    i && di(function() {
                        var e = Ht.from,
                            n = Ht.to;
                        hr(t, t),
                            qt && Wn("", e, n),
                            Xn(i),
                            er()
                    })
                } catch(e) {}
            }
        }
        function Nn(e) {
            var t = Jn();
            e.dataTransfer.setData("Text", t),
                e.dataTransfer.setDragImage && e.dataTransfer.setDragImage(mt("img"), 0, 0)
        }
        function Cn(e, t) {
            if (typeof e == "string") {
                e = a[e];
                if (!e) return ! 1
            }
            var n = Bt;
            try {
                s.readOnly && (Ut = !0),
                    t && (Bt = null),
                    e(dn)
            } catch(r) {
                if (r != nt) throw r;
                return ! 1
            } finally {
                Bt = n,
                    Ut = !1
            }
            return ! 0
        }
        function Ln(e) {
            function f() {
                a = !0
            }
            var t = l(s.keyMap),
                r = t.auto;
            clearTimeout(kn),
                r && !h(e) && (kn = setTimeout(function() {
                        l(s.keyMap) == t && (s.keyMap = r.call ? r.call(null, dn) : r)
                    },
                    50));
            var i = Nt[Z(e, "keyCode")],
                o = !1,
                u = w && n;
            if (i == null || e.altGraphKey) return ! 1;
            Z(e, "altKey") && (i = "Alt-" + i),
                Z(e, u ? "metaKey": "ctrlKey") && (i = "Ctrl-" + i),
                Z(e, u ? "ctrlKey": "metaKey") && (i = "Cmd-" + i);
            var a = !1;
            return Z(e, "shiftKey") ? o = c("Shift-" + i, s.extraKeys, s.keyMap,
                function(e) {
                    return Cn(e, !0)
                },
                f) || c(i, s.extraKeys, s.keyMap,
                function(e) {
                    if (typeof e == "string" && /^go[A-Z]/.test(e)) return Cn(e)
                },
                f) : o = c(i, s.extraKeys, s.keyMap, Cn, f),
                a && (o = !1),
                o && (J(e), ri(), d && (e.oldKeyCode = e.keyCode, e.keyCode = 0)),
                o
        }
        function An(e, t) {
            var n = c("'" + t + "'", s.extraKeys, s.keyMap,
                function(e) {
                    return Cn(e, !0)
                });
            return n && (J(e), ri()),
                n
        }
        function Mn(e) {
            Pt || Pn(),
                d && e.keyCode == 27 && (e.returnValue = !1),
                on && Yn() && (on = !1);
            if (s.onKeyEvent && s.onKeyEvent(dn, $(e))) return;
            var t = Z(e, "keyCode");
            cr(t == 16 || Z(e, "shiftKey"));
            var r = Ln(e);
            w && (On = r ? t: null, !r && t == 88 && Z(e, n ? "metaKey": "ctrlKey") && Xn(""))
        }
        function _n(e) {
            on && Yn();
            if (s.onKeyEvent && s.onKeyEvent(dn, $(e))) return;
            var t = Z(e, "keyCode"),
                n = Z(e, "charCode");
            if (w && t == On) {
                On = null,
                    J(e);
                return
            }
            if ((w && (!e.which || e.which < 10) || S) && Ln(e)) return;
            var r = String.fromCharCode(n == null ? t: n);
            s.electricChars && Mt.electricChars && s.smartIndent && !s.readOnly && Mt.electricChars.indexOf(r) > -1 && setTimeout(pi(function() {
                Nr(Ht.to.line, "smart")
            }), 75);
            if (An(e, r)) return;
            Qn()
        }
        function Dn(e) {
            if (s.onKeyEvent && s.onKeyEvent(dn, $(e))) return;
            Z(e, "keyCode") == 16 && (Bt = null)
        }
        function Pn() {
            if (s.readOnly == "nocursor") return;
            Pt || (s.onFocus && s.onFocus(dn), Pt = !0, Ct.className.search(/\bCodeMirror-focused\b/) == -1 && (Ct.className += " CodeMirror-focused")),
                Kn(),
                ri()
        }
        function Hn() {
            Pt && (s.onBlur && s.onBlur(dn), Pt = !1, tn && pi(function() {
                tn && (tn(), tn = null)
            })(), Ct.className = Ct.className.replace(" CodeMirror-focused", "")),
                clearInterval(Ot),
                setTimeout(function() {
                        Pt || (Bt = null)
                    },
                    150)
        }
        function Bn(e, t, n, r, i) {
            if (Ut) return;
            var o = [];
            _t.iter(e.line, t.line + 1,
                function(e) {
                    o.push(P(e.text, e.markedSpans))
                });
            if (an) {
                an.addChange(e.line, n.length, o);
                while (an.done.length > s.undoDepth) an.done.shift()
            }
            var u = M(D(o[0]), D(ct(o)), e.ch, t.ch, n);
            qn(e, t, u, r, i)
        }
        function jn(e, t) {
            if (!e.length) return;
            var n = e.pop(),
                r = [];
            for (var i = n.length - 1; i >= 0; i -= 1) {
                var s = n[i],
                    o = [],
                    u = s.start + s.added;
                _t.iter(s.start, u,
                    function(e) {
                        o.push(P(e.text, e.markedSpans))
                    }),
                    r.push({
                        start: s.start,
                        added: s.old.length,
                        old: o
                    });
                var a = {
                    line: s.start + s.old.length - 1,
                    ch: wt(_(ct(o)), _(ct(s.old)))
                };
                qn({
                        line: s.start,
                        ch: 0
                    },
                    {
                        line: u - 1,
                        ch: vn(u - 1).text.length
                    },
                    s.old, a, a)
            }
            Wt = !0,
                t.push(r)
        }
        function Fn() {
            jn(an.done, an.undone)
        }
        function In() {
            jn(an.undone, an.done)
        }
        function qn(e, t, n, r, i) {
            function w(e) {
                return e <= Math.min(t.line, t.line + g) ? e: e + g
            }
            if (Ut) return;
            var o = !1,
                u = nn.text.length;
            s.lineWrapping || _t.iter(e.line, t.line + 1,
                function(e) {
                    if (!e.hidden && e.text.length == u) return o = !0,
                        !0
                });
            if (e.line != t.line || n.length > 1) Kt = !0;
            var a = t.line - e.line,
                f = vn(e.line),
                l = vn(t.line),
                c = ct(n);
            if (e.ch == 0 && t.ch == 0 && _(c) == "") {
                var h = [],
                    p = null;
                for (var d = 0,
                         v = n.length - 1; d < v; ++d) h.push(new F(_(n[d]), D(n[d])));
                l.update(l.text, D(c)),
                    a && _t.remove(e.line, a, Qt),
                    h.length && _t.insert(e.line, h)
            } else if (f == l) if (n.length == 1) f.update(f.text.slice(0, e.ch) + _(n[0]) + f.text.slice(t.ch), D(n[0]));
            else {
                for (var h = [], d = 1, v = n.length - 1; d < v; ++d) h.push(new F(_(n[d]), D(n[d])));
                h.push(new F(_(c) + f.text.slice(t.ch), D(c))),
                    f.update(f.text.slice(0, e.ch) + _(n[0]), D(n[0])),
                    _t.insert(e.line + 1, h)
            } else if (n.length == 1) f.update(f.text.slice(0, e.ch) + _(n[0]) + l.text.slice(t.ch), D(n[0])),
                _t.remove(e.line + 1, a, Qt);
            else {
                var h = [];
                f.update(f.text.slice(0, e.ch) + _(n[0]), D(n[0])),
                    l.update(_(c) + l.text.slice(t.ch), D(c));
                for (var d = 1,
                         v = n.length - 1; d < v; ++d) h.push(new F(_(n[d]), D(n[d])));
                a > 1 && _t.remove(e.line + 1, a - 1, Qt),
                    _t.insert(e.line + 1, h)
            }
            if (s.lineWrapping) {
                var m = Math.max(5, Ct.clientWidth / Gr() - 3);
                _t.iter(e.line, e.line + n.length,
                    function(e) {
                        if (e.hidden) return;
                        var t = Math.ceil(e.text.length / m) || 1;
                        t != e.height && mn(e, t)
                    })
            } else _t.iter(e.line, e.line + n.length,
                function(e) {
                    var t = e.text; ! e.hidden && t.length > u && (nn = e, u = t.length, sn = !0, o = !1)
                }),
                o && (rn = !0);
            Dt = Math.min(Dt, e.line),
                fi(400);
            var g = n.length - a - 1;
            Vt.push({
                from: e.line,
                to: t.line + 1,
                diff: g
            });
            if (s.onChange) {
                for (var d = 0; d < n.length; ++d) typeof n[d] != "string" && (n[d] = n[d].text);
                var y = {
                    from: e,
                    to: t,
                    text: n
                };
                if ($t) {
                    for (var b = $t; b.next; b = b.next);
                    b.next = y
                } else $t = y
            }
            pr(gr(r), gr(i), w(Ht.from.line), w(Ht.to.line))
        }
        function Rn() {
            var e = _t.height * Jr() + 2 * Yr();
            return e * .99 > Ct.offsetHeight ? e: !1
        }
        function Un(e) {
            var t = Rn();
            A.style.display = t ? "block": "none",
                t ? (k.style.height = bt.style.minHeight = t + "px", A.style.height = Ct.clientHeight + "px", e != null && (A.scrollTop = Ct.scrollTop = e, y && setTimeout(function() {
                        if (A.scrollTop != e) return;
                        A.scrollTop = e + (e ? -1 : 1),
                            A.scrollTop = e
                    },
                    0))) : bt.style.minHeight = "",
                ft.style.top = Gt * Jr() + "px"
        }
        function zn() {
            nn = vn(0),
                sn = !0;
            var e = nn.text.length;
            _t.iter(1, _t.size,
                function(t) {
                    var n = t.text; ! t.hidden && n.length > e && (e = n.length, nn = t)
                }),
                rn = !1
        }
        function Wn(e, t, n) {
            function r(r) {
                if (dt(r, t)) return r;
                if (!dt(n, r)) return i;
                var s = r.line + e.length - (n.line - t.line) - 1,
                    o = r.ch;
                return r.line == n.line && (o += ct(e).length - (n.ch - (n.line == t.line ? t.ch: 0))),
                {
                    line: s,
                    ch: o
                }
            }
            t = gr(t),
                n ? n = gr(n) : n = t,
                e = xt(e);
            var i;
            return Vn(e, t, n,
                function(e) {
                    return i = e,
                    {
                        from: r(Ht.from),
                        to: r(Ht.to)
                    }
                }),
                i
        }
        function Xn(e, t) {
            Vn(xt(e), Ht.from, Ht.to,
                function(e) {
                    return t == "end" ? {
                        from: e,
                        to: e
                    }: t == "start" ? {
                        from: Ht.from,
                        to: Ht.from
                    }: {
                        from: Ht.from,
                        to: e
                    }
                })
        }
        function Vn(e, t, n, r) {
            var i = e.length == 1 ? e[0].length + t.ch: ct(e).length,
                s = r({
                    line: t.line + e.length - 1,
                    ch: i
                });
            Bn(t, n, e, s.from, s.to)
        }
        function $n(e, t, n) {
            var r = e.line,
                i = t.line;
            if (r == i) return vn(r).text.slice(e.ch, t.ch);
            var s = [vn(r).text.slice(e.ch)];
            return _t.iter(r + 1, i,
                function(e) {
                    s.push(e.text)
                }),
                s.push(vn(i).text.slice(0, t.ch)),
                s.join(n || "\n")
        }
        function Jn(e) {
            return $n(Ht.from, Ht.to, e)
        }
        function Kn() {
            if (on) return;
            Lt.set(s.pollInterval,
                function() {
                    Yn(),
                        Pt && Kn()
                })
        }
        function Qn() {
            function t() {
                var n = Yn(); ! n && !e ? (e = !0, Lt.set(60, t)) : (on = !1, Kn())
            }
            var e = !1;
            on = !0,
                Lt.set(20, t)
        }
        function Yn() {
            if (!Pt || Tt(E) || s.readOnly) return ! 1;
            var e = E.value;
            if (e == Gn) return ! 1;
            hi || li(),
                Bt = null;
            var t = 0,
                n = Math.min(Gn.length, e.length);
            while (t < n && Gn[t] == e[t])++t;
            return t < Gn.length ? Ht.from = {
                line: Ht.from.line,
                ch: Ht.from.ch - (Gn.length - t)
            }: Rt && pt(Ht.from, Ht.to) && !zt && (Ht.to = {
                line: Ht.to.line,
                ch: Math.min(vn(Ht.to.line).text.length, Ht.to.ch + (e.length - t))
            }),
                Xn(e.slice(t), "end"),
                e.length > 1e3 ? E.value = Gn = "": Gn = e,
                hi || ci(),
                zt = !1,
                !0
        }
        function Zn(e) {
            pt(Ht.from, Ht.to) ? e && (Gn = E.value = "") : (Gn = "", E.value = Jn(), Pt && ht(E))
        }
        function er() {
            s.readOnly != "nocursor" && E.focus()
        }
        function tr() {
            var e = nr();
            rr(e.x, e.y, e.x, e.yBot);
            if (!Pt) return;
            var t = bt.getBoundingClientRect(),
                n = null;
            e.y + t.top < 0 ? n = !0 : e.y + t.top + Jr() > (window.innerHeight || document.documentElement.clientHeight) && (n = !1);
            if (n != null) {
                var r = B.style.display == "none";
                r && (B.style.display = "", B.style.left = e.x + "px", B.style.top = e.y - Gt + "px"),
                    B.scrollIntoView(n),
                    r && (B.style.display = "none")
            }
        }
        function nr() {
            var e = Ur(Ht.inverted ? Ht.from: Ht.to),
                t = s.lineWrapping ? Math.min(e.x, K.offsetWidth) : e.x;
            return {
                x: t,
                y: e.y,
                yBot: e.yBot
            }
        }
        function rr(e, t, n, r) {
            var i = ir(e, t, n, r);
            i.scrollLeft != null && (Ct.scrollLeft = i.scrollLeft),
                i.scrollTop != null && (A.scrollTop = Ct.scrollTop = i.scrollTop)
        }
        function ir(e, t, n, r) {
            var i = Zr(),
                o = Yr();
            t += o,
                r += o,
                e += i,
                n += i;
            var u = Ct.clientHeight,
                a = A.scrollTop,
                f = {},
                l = Rn() || Infinity,
                c = t < o + 10,
                h = r + o > l - 10;
            t < a ? f.scrollTop = c ? 0 : Math.max(0, t) : r > a + u && (f.scrollTop = (h ? l: r) - u);
            var p = Ct.clientWidth,
                d = Ct.scrollLeft,
                v = s.fixedGutter ? ot.clientWidth: 0,
                m = e < v + i + 10;
            return e < d + v || m ? (m && (e = 0), f.scrollLeft = Math.max(0, e - 10 - v)) : n > p + d - 3 && (f.scrollLeft = n + 10 - p),
                f
        }
        function sr(e) {
            var t = Jr(),
                n = (e != null ? e: A.scrollTop) - Yr(),
                r = Math.max(0, Math.floor(n / t)),
                i = Math.ceil((n + Ct.clientHeight) / t);
            return {
                from: z(_t, r),
                to: z(_t, i)
            }
        }
        function or(e, t, n) {
            function d() {
                var e = O.firstChild,
                    t = !1;
                return _t.iter(Yt, Zt,
                    function(n) {
                        if (!e) return;
                        if (!n.hidden) {
                            var r = Math.round(e.offsetHeight / c) || 1;
                            n.height != r && (mn(n, r), Kt = t = !0)
                        }
                        e = e.nextSibling
                    }),
                    t
            }
            if (!Ct.clientWidth) {
                Yt = Zt = Gt = 0;
                return
            }
            var r = sr(n);
            if (e !== !0 && e.length == 0 && r.from > Yt && r.to < Zt) {
                Un(n);
                return
            }
            var i = Math.max(r.from - 100, 0),
                o = Math.min(_t.size, r.to + 100);
            Yt < i && i - Yt < 20 && (i = Yt),
                Zt > o && Zt - o < 20 && (o = Math.min(_t.size, Zt));
            var u = e === !0 ? [] : ur([{
                    from: Yt,
                    to: Zt,
                    domStart: 0
                }], e),
                a = 0;
            for (var f = 0; f < u.length; ++f) {
                var l = u[f];
                l.from < i && (l.domStart += i - l.from, l.from = i),
                    l.to > o && (l.to = o),
                    l.from >= l.to ? u.splice(f--, 1) : a += l.to - l.from
            }
            if (a == o - i && i == Yt && o == Zt) {
                Un(n);
                return
            }
            u.sort(function(e, t) {
                return e.domStart - t.domStart
            });
            var c = Jr(),
                h = ot.style.display;
            O.style.display = "none",
                ar(i, o, u),
                O.style.display = ot.style.display = "";
            var p = i != Yt || o != Zt || en != Ct.clientHeight + c;
            p && (en = Ct.clientHeight + c),
                (i != Yt || o != Zt && s.onViewportChange) && setTimeout(function() {
                    s.onViewportChange && s.onViewportChange(dn, i, o)
                }),
                Yt = i,
                Zt = o,
                Gt = W(_t, i),
                fi(100);
            if (O.childNodes.length != Zt - Yt) throw new Error("BAD PATCH! " + JSON.stringify(u) + " size=" + (Zt - Yt) + " nodes=" + O.childNodes.length);
            return s.lineWrapping && d(),
                ot.style.display = h,
                (p || Kt) && fr() && s.lineWrapping && d() && fr(),
                Un(n),
                lr(),
                !t && s.onUpdate && s.onUpdate(dn),
                !0
        }
        function ur(e, t) {
            for (var n = 0,
                     r = t.length || 0; n < r; ++n) {
                var i = t[n],
                    s = [],
                    o = i.diff || 0;
                for (var u = 0,
                         a = e.length; u < a; ++u) {
                    var f = e[u];
                    i.to <= f.from && i.diff ? s.push({
                        from: f.from + o,
                        to: f.to + o,
                        domStart: f.domStart
                    }) : i.to <= f.from || i.from >= f.to ? s.push(f) : (i.from > f.from && s.push({
                        from: f.from,
                        to: i.from,
                        domStart: f.domStart
                    }), i.to < f.to && s.push({
                        from: i.to + o,
                        to: f.to + o,
                        domStart: f.domStart + (i.to - f.from)
                    }))
                }
                e = s
            }
            return e
        }
        function ar(e, t, n) {
            function r(e) {
                var t = e.nextSibling;
                return e.parentNode.removeChild(e),
                    t
            }
            if (!n.length) gt(O);
            else {
                var i = 0,
                    s = O.firstChild,
                    o;
                for (var u = 0; u < n.length; ++u) {
                    var a = n[u];
                    while (a.domStart > i) s = r(s),
                        i++;
                    for (var f = 0,
                             l = a.to - a.from; f < l; ++f) s = s.nextSibling,
                        i++
                }
                while (s) s = r(s)
            }
            var c = n.shift(),
                s = O.firstChild,
                f = e;
            _t.iter(e, t,
                function(e) {
                    c && c.to == f && (c = n.shift());
                    if (!c || c.from > f) {
                        if (e.hidden) var t = mt("pre");
                        else {
                            var t = gn(e);
                            e.className && (t.className = e.className);
                            if (e.bgClassName) {
                                var r = mt("pre", "\u00a0", e.bgClassName, "position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2");
                                t = mt("div", [r, t], null, "position: relative")
                            }
                        }
                        O.insertBefore(t, s)
                    } else s = s.nextSibling; ++f
                })
        }
        function fr() {
            if (!s.gutter && !s.lineNumbers) return;
            var e = ft.offsetHeight,
                t = Ct.clientHeight;
            ot.style.height = (e - t < 2 ? t: e) + "px";
            var n = document.createDocumentFragment(),
                r = Yt,
                i;
            _t.iter(Yt, Math.max(Zt, Yt + 1),
                function(e) {
                    if (e.hidden) n.appendChild(mt("pre"));
                    else {
                        var t = e.gutterMarker,
                            o = s.lineNumbers ? s.lineNumberFormatter(r + s.firstLineNumber) : null;
                        t && t.text ? o = t.text.replace("%N%", o != null ? o: "") : o == null && (o = "\u00a0");
                        var u = n.appendChild(mt("pre", null, t && t.style));
                        u.innerHTML = o;
                        for (var a = 1; a < e.height; ++a) u.appendChild(mt("br")),
                            u.appendChild(document.createTextNode("\u00a0"));
                        t || (i = r)
                    }++r
                }),
                ot.style.display = "none",
                yt(it, n);
            if (i != null && s.lineNumbers) {
                var o = it.childNodes[i - Yt],
                    u = String(_t.size).length,
                    a = at(o.firstChild),
                    f = "";
                while (a.length + f.length < u) f += "\u00a0";
                f && o.insertBefore(document.createTextNode(f), o.firstChild)
            }
            ot.style.display = "";
            var l = Math.abs((parseInt(K.style.marginLeft) || 0) - ot.offsetWidth) > 2;
            return K.style.marginLeft = ot.offsetWidth + "px",
                Kt = !1,
                l
        }
        function lr() {
            var e = pt(Ht.from, Ht.to),
                t = Ur(Ht.from, !0),
                n = e ? t: Ur(Ht.to, !0),
                r = Ht.inverted ? t: n,
                i = Jr(),
                o = ut(kt),
                u = ut(O);
            C.style.top = Math.max(0, Math.min(Ct.offsetHeight, r.y + u.top - o.top)) + "px",
                C.style.left = Math.max(0, Math.min(Ct.offsetWidth, r.x + u.left - o.left)) + "px";
            if (e) B.style.top = r.y + "px",
                B.style.left = (s.lineWrapping ? Math.min(r.x, K.offsetWidth) : r.x) + "px",
                B.style.display = "",
                H.style.display = "none";
            else {
                var a = t.y == n.y,
                    f = document.createDocumentFragment(),
                    l = K.clientWidth || K.offsetWidth,
                    c = K.clientHeight || K.offsetHeight,
                    h = function(e, t, n, r) {
                        var i = g ? "width: " + (n ? l - n - e: l) + "px": "right: " + n + "px";
                        f.appendChild(mt("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; " + i + "; height: " + r + "px"))
                    };
                if (Ht.from.ch && t.y >= 0) {
                    var p = a ? l - n.x: 0;
                    h(t.x, t.y, p, i)
                }
                var d = Math.max(0, t.y + (Ht.from.ch ? i: 0)),
                    v = Math.min(n.y, c) - d;
                v > .2 * i && h(0, d, 0, v),
                    (!a || !Ht.from.ch) && n.y < c - .5 * i && h(0, n.y, l - n.x, i),
                    yt(H, f),
                    B.style.display = "none",
                    H.style.display = ""
            }
        }
        function cr(e) {
            e ? Bt = Bt || (Ht.inverted ? Ht.to: Ht.from) : Bt = null
        }
        function hr(e, t) {
            var n = Bt && gr(Bt);
            n && (dt(n, e) ? e = n: dt(t, n) && (t = n)),
                pr(e, t),
                Xt = !0
        }
        function pr(e, t, n, r) {
            un = null,
                n == null && (n = Ht.from.line, r = Ht.to.line);
            if (pt(Ht.from, e) && pt(Ht.to, t)) return;
            if (dt(t, e)) {
                var i = t;
                t = e,
                    e = i
            }
            if (e.line != n) {
                var o = dr(e, n, Ht.from.ch);
                o ? e = o: Ir(e.line, !1)
            }
            t.line != r && (t = dr(t, r, Ht.to.ch)),
                pt(e, t) ? Ht.inverted = !1 : pt(e, Ht.to) ? Ht.inverted = !1 : pt(t, Ht.from) && (Ht.inverted = !0);
            if (s.autoClearEmptyLines && pt(Ht.from, Ht.to)) {
                var u = Ht.inverted ? e: t;
                if (u.line != Ht.from.line && Ht.from.line < _t.size) {
                    var a = vn(Ht.from.line);
                    /^\s+$/.test(a.text) && setTimeout(pi(function() {
                            if (a.parent && /^\s+$/.test(a.text)) {
                                var e = U(a);
                                Wn("", {
                                        line: e,
                                        ch: 0
                                    },
                                    {
                                        line: e,
                                        ch: a.text.length
                                    })
                            }
                        },
                        10))
                }
            }
            Ht.from = e,
                Ht.to = t,
                Jt = !0
        }
        function dr(e, t, n) {
            function r(t) {
                var r = e.line + t,
                    i = t == 1 ? _t.size: -1;
                while (r != i) {
                    var o = vn(r);
                    if (!o.hidden) {
                        var u = e.ch;
                        if (s || u > n || u > o.text.length) u = o.text.length;
                        return {
                            line: r,
                            ch: u
                        }
                    }
                    r += t
                }
            }
            var i = vn(e.line),
                s = e.ch == i.text.length && e.ch != n;
            return i.hidden ? e.line >= t ? r(1) || r( - 1) : r( - 1) || r(1) : e
        }
        function vr(e, t, n) {
            var r = gr({
                line: e,
                ch: t || 0
            }); (n ? hr: pr)(r, r)
        }
        function mr(e) {
            return Math.max(0, Math.min(e, _t.size - 1))
        }
        function gr(e) {
            if (e.line < 0) return {
                line: 0,
                ch: 0
            };
            if (e.line >= _t.size) return {
                line: _t.size - 1,
                ch: vn(_t.size - 1).text.length
            };
            var t = e.ch,
                n = vn(e.line).text.length;
            return t == null || t > n ? {
                line: e.line,
                ch: n
            }: t < 0 ? {
                line: e.line,
                ch: 0
            }: e
        }
        function yr(e, t) {
            function o() {
                for (var t = r + e,
                         n = e < 0 ? -1 : _t.size; t != n; t += e) {
                    var i = vn(t);
                    if (!i.hidden) return r = t,
                        s = i,
                        !0
                }
            }
            function u(t) {
                if (i == (e < 0 ? 0 : s.text.length)) {
                    if ( !! t || !o()) return ! 1;
                    i = e < 0 ? s.text.length: 0
                } else i += e;
                return ! 0
            }
            var n = Ht.inverted ? Ht.from: Ht.to,
                r = n.line,
                i = n.ch,
                s = vn(r);
            if (t == "char") u();
            else if (t == "column") u(!0);
            else if (t == "word") {
                var a = !1;
                for (;;) {
                    if (e < 0 && !u()) break;
                    if (St(s.text.charAt(i))) a = !0;
                    else if (a) {
                        e < 0 && (e = 1, u());
                        break
                    }
                    if (e > 0 && !u()) break
                }
            }
            return {
                line: r,
                ch: i
            }
        }
        function br(e, t) {
            var n = e < 0 ? Ht.from: Ht.to;
            if (Bt || pt(Ht.from, Ht.to)) n = yr(e, t);
            vr(n.line, n.ch, !0)
        }
        function wr(e, t) {
            pt(Ht.from, Ht.to) ? e < 0 ? Wn("", yr(e, t), Ht.to) : Wn("", Ht.from, yr(e, t)) : Wn("", Ht.from, Ht.to),
                Xt = !0
        }
        function Er(e, t) {
            var n = 0,
                r = Ur(Ht.inverted ? Ht.from: Ht.to, !0);
            un != null && (r.x = un);
            if (t == "page") var i = Math.min(Ct.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                s = zr(r.x, r.y + i * e);
            else if (t == "line") var o = Jr(),
                s = zr(r.x, r.y + .5 * o + e * o);
            t == "page" && (A.scrollTop += Ur(s, !0).y - r.y),
                vr(s.line, s.ch, !0),
                un = r.x
        }
        function Sr(e) {
            var t = vn(e.line).text,
                n = e.ch,
                r = e.ch;
            if (t) {
                e.after === !1 || r == t.length ? --n: ++r;
                var i = t.charAt(n),
                    s = St(i) ? St: /\s/.test(i) ?
                        function(e) {
                            return /\s/.test(e)
                        }: function(e) {
                        return ! /\s/.test(e) && !St(e)
                    };
                while (n > 0 && s(t.charAt(n - 1)))--n;
                while (r < t.length && s(t.charAt(r)))++r
            }
            return {
                from: {
                    line: e.line,
                    ch: n
                },
                to: {
                    line: e.line,
                    ch: r
                }
            }
        }
        function xr(e) {
            hr({
                    line: e,
                    ch: 0
                },
                gr({
                    line: e + 1,
                    ch: 0
                }))
        }
        function Tr(e) {
            if (pt(Ht.from, Ht.to)) return Nr(Ht.from.line, e);
            var t = Ht.to.line - (Ht.to.ch ? 0 : 1);
            for (var n = Ht.from.line; n <= t; ++n) Nr(n, e)
        }
        function Nr(e, t) {
            t || (t = "add");
            if (t == "smart") if (!Mt.indent) t = "prev";
            else var n = ui(e);
            var r = vn(e),
                i = r.indentation(s.tabSize),
                o = r.text.match(/^\s*/)[0],
                u;
            t == "smart" && (u = Mt.indent(n, r.text.slice(o.length), r.text), u == nt && (t = "prev")),
                t == "prev" ? e ? u = vn(e - 1).indentation(s.tabSize) : u = 0 : t == "add" ? u = i + s.indentUnit: t == "subtract" && (u = i - s.indentUnit),
                u = Math.max(0, u);
            var a = u - i,
                f = "",
                l = 0;
            if (s.indentWithTabs) for (var c = Math.floor(u / s.tabSize); c; --c) l += s.tabSize,
                f += "	";
            l < u && (f += lt(u - l)),
                f != o && Wn(f, {
                        line: e,
                        ch: 0
                    },
                    {
                        line: e,
                        ch: o.length
                    }),
                r.stateAfter = null
        }
        function Cr() {
            Mt = e.getMode(s, s.mode),
                _t.iter(0, _t.size,
                    function(e) {
                        e.stateAfter = null
                    }),
                Dt = 0,
                fi(100)
        }
        function kr() {
            var e = s.gutter || s.lineNumbers;
            ot.style.display = e ? "": "none",
                e ? Kt = !0 : O.parentNode.style.marginLeft = 0
        }
        function Lr(e, t) {
            if (s.lineWrapping) {
                kt.className += " CodeMirror-wrap";
                var n = Ct.clientWidth / Gr() - 3;
                _t.iter(0, _t.size,
                    function(e) {
                        if (e.hidden) return;
                        var t = Math.ceil(e.text.length / n) || 1;
                        t != 1 && mn(e, t)
                    }),
                    K.style.minWidth = j.style.left = ""
            } else kt.className = kt.className.replace(" CodeMirror-wrap", ""),
                zn(),
                _t.iter(0, _t.size,
                    function(e) {
                        e.height != 1 && !e.hidden && mn(e, 1)
                    });
            Vt.push({
                from: 0,
                to: _t.size
            })
        }
        function Ar() {
            Ct.className = Ct.className.replace(/\s*cm-s-\S+/g, "") + s.theme.replace(/(^|\s)\s*/g, " cm-s-")
        }
        function Or() {
            var e = f[s.keyMap].style;
            kt.className = kt.className.replace(/\s*cm-keymap-\S+/g, "") + (e ? " cm-keymap-" + e: "")
        }
        function Mr(e, t) {
            this.lines = [],
                this.type = e,
                t && (this.style = t)
        }
        function _r(e, t, n, r) {
            e = gr(e),
                t = gr(t);
            var i = new Mr("range", n);
            if (r) for (var s in r) r.hasOwnProperty(s) && (i[s] = r[s]);
            var o = e.line;
            return _t.iter(o, t.line + 1,
                function(n) {
                    var r = {
                        from: o == e.line ? e.ch: null,
                        to: o == t.line ? t.ch: null,
                        marker: i
                    }; (n.markedSpans || (n.markedSpans = [])).push(r),
                        i.lines.push(n),
                        ++o
                }),
                Vt.push({
                    from: e.line,
                    to: t.line + 1
                }),
                i
        }
        function Dr(e) {
            e = gr(e);
            var t = new Mr("bookmark"),
                n = vn(e.line),
                r = {
                    from: e.ch,
                    to: e.ch,
                    marker: t
                };
            return (n.markedSpans || (n.markedSpans = [])).push(r),
                t.lines.push(n),
                t
        }
        function Pr(e) {
            e = gr(e);
            var t = [],
                n = vn(e.line).markedSpans;
            if (n) for (var r = 0; r < n.length; ++r) {
                var i = n[r]; (i.from == null || i.from <= e.ch) && (i.to == null || i.to >= e.ch) && t.push(i.marker)
            }
            return t
        }
        function Hr(e, t, n) {
            return typeof e == "number" && (e = vn(mr(e))),
                e.gutterMarker = {
                    text: t,
                    style: n
                },
                Kt = !0,
                e
        }
        function Br(e) {
            typeof e == "number" && (e = vn(mr(e))),
                e.gutterMarker = null,
                Kt = !0
        }
        function jr(e, t) {
            var n = e,
                r = e;
            return typeof e == "number" ? r = vn(mr(e)) : n = U(e),
                n == null ? null: t(r, n) ? (Vt.push({
                    from: n,
                    to: n + 1
                }), r) : null
        }
        function Fr(e, t, n) {
            return jr(e,
                function(e) {
                    if (e.className != t || e.bgClassName != n) return e.className = t,
                        e.bgClassName = n,
                        !0
                })
        }
        function Ir(e, t) {
            return jr(e,
                function(e, n) {
                    if (e.hidden != t) {
                        e.hidden = t,
                            s.lineWrapping || (t && e.text.length == nn.text.length ? rn = !0 : !t && e.text.length > nn.text.length && (nn = e, rn = !1)),
                            mn(e, t ? 0 : 1);
                        var r = Ht.from.line,
                            i = Ht.to.line;
                        if (t && (r == n || i == n)) {
                            var o = r == n ? dr({
                                        line: r,
                                        ch: 0
                                    },
                                    r, 0) : Ht.from,
                                u = i == n ? dr({
                                        line: i,
                                        ch: 0
                                    },
                                    i, 0) : Ht.to;
                            if (!u) return;
                            pr(o, u)
                        }
                        return Kt = !0
                    }
                })
        }
        function qr(e) {
            if (typeof e == "number") {
                if (!pn(e)) return null;
                var t = e;
                e = vn(e);
                if (!e) return null
            } else {
                var t = U(e);
                if (t == null) return null
            }
            var n = e.gutterMarker;
            return {
                line: t,
                handle: e,
                text: e.text,
                markerText: n && n.text,
                markerClass: n && n.style,
                lineClass: e.className,
                bgClass: e.bgClassName
            }
        }
        function Rr(e, t) {
            if (t == 0) return {
                top: 0,
                left: 0
            };
            var n = s.lineWrapping && t < e.text.length && st.test(e.text.slice(t - 1, t + 1)),
                r = gn(e, t);
            yt(V, r);
            var i = r.anchor,
                o = i.offsetTop,
                u = i.offsetLeft;
            if (d && o == 0 && u == 0) {
                var a = mt("span", "x");
                i.parentNode.insertBefore(a, i.nextSibling),
                    o = a.offsetTop
            }
            return {
                top: o,
                left: u
            }
        }
        function Ur(e, t) {
            var n, r = Jr(),
                i = r * (W(_t, e.line) - (t ? Gt: 0));
            if (e.ch == 0) n = 0;
            else {
                var o = Rr(vn(e.line), e.ch);
                n = o.left,
                    s.lineWrapping && (i += Math.max(0, o.top))
            }
            return {
                x: n,
                y: i,
                yBot: i + r
            }
        }
        function zr(e, t) {
            function h(e) {
                var t = Rr(u, e);
                if (f) {
                    var r = Math.round(t.top / n);
                    return c = r != l,
                        Math.max(0, t.left + (r - l) * Ct.clientWidth)
                }
                return t.left
            }
            var n = Jr(),
                r = Gr(),
                i = Gt + Math.floor(t / n);
            if (i < 0) return {
                line: 0,
                ch: 0
            };
            var o = z(_t, i);
            if (o >= _t.size) return {
                line: _t.size - 1,
                ch: vn(_t.size - 1).text.length
            };
            var u = vn(o),
                a = u.text,
                f = s.lineWrapping,
                l = f ? i - W(_t, o) : 0;
            if (e <= 0 && l == 0) return {
                line: o,
                ch: 0
            };
            var c = !1,
                p = 0,
                d = 0,
                v = a.length,
                m, g = Math.min(v, Math.ceil((e + l * Ct.clientWidth * .9) / r));
            for (;;) {
                var y = h(g);
                if (! (y <= e && g < v)) {
                    m = y,
                        v = g;
                    break
                }
                g = Math.min(v, Math.ceil(g * 1.2))
            }
            if (e > m) return {
                line: o,
                ch: v
            };
            g = Math.floor(v * .8),
                y = h(g),
                y < e && (p = g, d = y);
            for (;;) {
                if (v - p <= 1) {
                    var b = e - d < m - e;
                    return {
                        line: o,
                        ch: b ? p: v,
                        after: b
                    }
                }
                var w = Math.ceil((p + v) / 2),
                    E = h(w);
                E > e ? (v = w, m = E, c && (m += 1e3)) : (p = w, d = E)
            }
        }
        function Wr(e) {
            var t = Ur(e, !0),
                n = ut(K);
            return {
                x: n.left + t.x,
                y: n.top + t.y,
                yBot: n.top + t.yBot
            }
        }
        function Jr() {
            if ($r == null) {
                $r = mt("pre");
                for (var e = 0; e < 49; ++e) $r.appendChild(document.createTextNode("x")),
                    $r.appendChild(mt("br"));
                $r.appendChild(document.createTextNode("x"))
            }
            var t = O.clientHeight;
            return t == Vr ? Xr: (Vr = t, yt(V, $r.cloneNode(!0)), Xr = V.firstChild.offsetHeight / 50 || 1, gt(V), Xr)
        }
        function Gr() {
            if (Ct.clientWidth == Qr) return Kr;
            Qr = Ct.clientWidth;
            var e = mt("span", "x"),
                t = mt("pre", [e]);
            return yt(V, t),
                Kr = e.offsetWidth || 10
        }
        function Yr() {
            return K.offsetTop
        }
        function Zr() {
            return K.offsetLeft
        }
        function ei(e, t) {
            var n = ut(Ct, !0),
                r,
                i;
            try {
                r = e.clientX,
                    i = e.clientY
            } catch(e) {
                return null
            }
            if (!t && (r - n.left > Ct.clientWidth || i - n.top > Ct.clientHeight)) return null;
            var s = ut(K, !0);
            return zr(r - s.left, i - s.top)
        }
        function ni(e) {
            function i() {
                C.style.position = "relative",
                    E.style.cssText = r,
                    m && (A.scrollTop = n),
                    Kn();
                if (E.selectionStart != null) {
                    clearTimeout(ti);
                    var e = E.value = " " + (pt(Ht.from, Ht.to) ? "": E.value),
                        t = 0;
                    Gn = " ",
                        E.selectionStart = 1,
                        E.selectionEnd = e.length,
                        ti = setTimeout(function i() {
                                Gn == " " && E.selectionStart == 0 ? pi(a.selectAll)(dn) : t++<10 ? ti = setTimeout(i, 500) : Zn()
                            },
                            200)
                }
            }
            var t = ei(e),
                n = A.scrollTop;
            if (!t || w) return; (pt(Ht.from, Ht.to) || dt(t, Ht.from) || !dt(t, Ht.to)) && pi(vr)(t.line, t.ch);
            var r = E.style.cssText;
            C.style.position = "absolute",
                E.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; " + "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",
                er(),
                Zn(!0),
                pt(Ht.from, Ht.to) && (E.value = Gn = " ");
            if (p) {
                Q(e);
                var s = et(window, "mouseup",
                    function() {
                        s(),
                            setTimeout(i, 20)
                    },
                    !0)
            } else setTimeout(i, 50)
        }
        function ri() {
            clearInterval(Ot);
            var e = !0;
            B.style.visibility = "",
                Ot = setInterval(function() {
                        B.style.visibility = (e = !e) ? "": "hidden"
                    },
                    s.cursorBlinkRate)
        }
        function si(e) {
            function v(e, t, n) {
                if (!e.text) return;
                var r = e.styles,
                    i = o ? 0 : e.text.length - 1,
                    s;
                for (var a = o ? 0 : r.length - 2, f = o ? r.length: -2; a != f; a += 2 * u) {
                    var l = r[a];
                    if (r[a + 1] != h) {
                        i += u * l.length;
                        continue
                    }
                    for (var c = o ? 0 : l.length - 1, v = o ? l.length: -1; c != v; c += u, i += u) if (i >= t && i < n && d.test(s = l.charAt(c))) {
                        var m = ii[s];
                        if (m.charAt(1) == ">" == o) p.push(s);
                        else {
                            if (p.pop() != m.charAt(0)) return {
                                pos: i,
                                match: !1
                            };
                            if (!p.length) return {
                                pos: i,
                                match: !0
                            }
                        }
                    }
                }
            }
            var t = Ht.inverted ? Ht.from: Ht.to,
                n = vn(t.line),
                r = t.ch - 1,
                i = r >= 0 && ii[n.text.charAt(r)] || ii[n.text.charAt(++r)];
            if (!i) return;
            var s = i.charAt(0),
                o = i.charAt(1) == ">",
                u = o ? 1 : -1,
                a = n.styles;
            for (var f = r + 1,
                     l = 0,
                     c = a.length; l < c; l += 2) if ((f -= a[l].length) <= 0) {
                var h = a[l + 1];
                break
            }
            var p = [n.text.charAt(r)],
                d = /[(){}[\]]/;
            for (var l = t.line,
                     c = o ? Math.min(l + 100, _t.size) : Math.max( - 1, l - 100); l != c; l += u) {
                var n = vn(l),
                    m = l == t.line,
                    g = v(n, m && o ? r + 1 : 0, m && !o ? r: n.text.length);
                if (g) break
            }
            g || (g = {
                pos: null,
                match: !1
            });
            var h = g.match ? "CodeMirror-matchingbracket": "CodeMirror-nonmatchingbracket",
                y = _r({
                        line: t.line,
                        ch: r
                    },
                    {
                        line: t.line,
                        ch: r + 1
                    },
                    h),
                b = g.pos != null && _r({
                        line: l,
                        ch: g.pos
                    },
                    {
                        line: l,
                        ch: g.pos + 1
                    },
                    h),
                w = pi(function() {
                    y.clear(),
                        b && b.clear()
                });
            e ? setTimeout(w, 800) : tn = w
        }
        function oi(e) {
            var t, n;
            for (var r = e,
                     i = e - 40; r > i; --r) {
                if (r == 0) return 0;
                var o = vn(r - 1);
                if (o.stateAfter) return r;
                var u = o.indentation(s.tabSize);
                if (n == null || t > u) n = r - 1,
                    t = u
            }
            return n
        }
        function ui(e) {
            var t = oi(e),
                n = t && vn(t - 1).stateAfter;
            return n ? n = T(Mt, n) : n = N(Mt),
                _t.iter(t, e,
                    function(r) {
                        r.process(Mt, n, s.tabSize),
                            r.stateAfter = t == e - 1 || t % 5 == 0 ? T(Mt, n) : null
                    }),
                n
        }
        function ai() {
            if (Dt >= Zt) return;
            var e = +(new Date) + s.workTime,
                t = T(Mt, ui(Dt)),
                n = Dt;
            _t.iter(Dt, Zt,
                function(n) {
                    Dt >= Yt ? (n.highlight(Mt, t, s.tabSize), n.stateAfter = T(Mt, t)) : (n.process(Mt, t, s.tabSize), n.stateAfter = Dt % 5 == 0 ? T(Mt, t) : null),
                        ++Dt;
                    if ( + (new Date) > e) return fi(s.workDelay),
                        !0
                }),
                Zt > n && Dt >= Yt && pi(function() {
                    Vt.push({
                        from: n,
                        to: Dt
                    })
                })()
        }
        function fi(e) {
            Dt < Zt && At.set(e, ai)
        }
        function li() {
            Wt = Xt = $t = null,
                Vt = [],
                Jt = !1,
                Qt = []
        }
        function ci() {
            rn && zn();
            if (sn && !s.lineWrapping) {
                var e = j.offsetWidth,
                    t = Rr(nn, nn.text.length).left;
                v || (j.style.left = t + "px", K.style.minWidth = t + e + "px"),
                    sn = !1
            }
            var n, r;
            if (Jt) {
                var i = nr();
                n = ir(i.x, i.y, i.x, i.yBot)
            }
            if (Vt.length || n && n.scrollTop != null) r = or(Vt, !0, n && n.scrollTop);
            r || (Jt && lr(), Kt && fr()),
                n && tr(),
                Jt && ri(),
                Pt && (Wt === !0 || Wt !== !1 && Jt) && Zn(Xt),
                Jt && s.matchBrackets && setTimeout(pi(function() {
                    tn && (tn(), tn = null),
                        pt(Ht.from, Ht.to) && si(!1)
                }), 20);
            var o = Jt,
                u = Qt;
            $t && s.onChange && dn && s.onChange(dn, $t),
                o && s.onCursorActivity && s.onCursorActivity(dn);
            for (var a = 0; a < u.length; ++a) u[a](dn);
            r && s.onUpdate && s.onUpdate(dn)
        }
        function pi(e) {
            return function() {
                hi++||li();
                try {
                    var t = e.apply(this, arguments)
                } finally {--hi || ci()
                }
                return t
            }
        }
        function di(e) {
            an.startCompound();
            try {
                return e()
            } finally {
                an.endCompound()
            }
        }
        var s = {},
            u = e.defaults;
        for (var b in u) u.hasOwnProperty(b) && (s[b] = (i && i.hasOwnProperty(b) ? i: u)[b]);
        var E = mt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em");
        E.setAttribute("wrap", "off"),
            E.setAttribute("autocorrect", "off"),
            E.setAttribute("autocapitalize", "off");
        var C = mt("div", [E], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"),
            k = mt("div", null, "CodeMirror-scrollbar-inner"),
            A = mt("div", [k], "CodeMirror-scrollbar"),
            O = mt("div"),
            H = mt("div", null, null, "position: relative; z-index: -1"),
            B = mt("pre", "\u00a0", "CodeMirror-cursor"),
            j = mt("pre", "\u00a0", "CodeMirror-cursor", "visibility: hidden"),
            V = mt("div", null, null, "position: absolute; width: 100%; height: 0px; overflow: hidden; visibility: hidden;"),
            K = mt("div", [V, B, j, H, O], null, "position: relative; z-index: 0"),
            it = mt("div", null, "CodeMirror-gutter-text"),
            ot = mt("div", [it], "CodeMirror-gutter"),
            ft = mt("div", [ot, mt("div", [K], "CodeMirror-lines")], null, "position: relative"),
            bt = mt("div", [ft], null, "position: relative"),
            Ct = mt("div", [bt], "CodeMirror-scroll");
        Ct.setAttribute("tabIndex", "-1");
        var kt = mt("div", [C, A, Ct], "CodeMirror" + (s.lineWrapping ? " CodeMirror-wrap": ""));
        r.appendChild ? r.appendChild(kt) : r(kt),
            Ar(),
            Or(),
            t && (E.style.width = "0px"),
            y || (Ct.draggable = !0),
            K.style.outline = "none",
            s.tabindex != null && (E.tabIndex = s.tabindex),
            s.autofocus && er(),
            !s.gutter && !s.lineNumbers && (ot.style.display = "none"),
            S && (C.style.height = "1px", C.style.position = "absolute"),
            x ? (A.style.zIndex = -2, A.style.visibility = "hidden") : v && (A.style.minWidth = "18px");
        var Lt = new tt,
            At = new tt,
            Ot, Mt, _t = new q([new I([new F("")])]),
            Dt = 0,
            Pt;
        Cr();
        var Ht = {
                from: {
                    line: 0,
                    ch: 0
                },
                to: {
                    line: 0,
                    ch: 0
                },
                inverted: !1
            },
            Bt,
            jt,
            Ft,
            It = 0,
            qt,
            Rt = !1,
            Ut = !1,
            zt = !1,
            Wt,
            Xt,
            Vt,
            $t,
            Jt,
            Kt,
            Qt,
            Gt = 0,
            Yt = 0,
            Zt = 0,
            en = 0,
            tn,
            nn = vn(0),
            rn = !1,
            sn = !0,
            on = !1,
            un = null;
        pi(function() {
            yn(s.value || ""),
                Wt = !1
        })();
        var an = new X;
        et(Ct, "mousedown", pi(Sn)),
            et(Ct, "dblclick", pi(xn)),
            et(K, "selectstart", J),
            p || et(Ct, "contextmenu", ni),
            et(Ct, "scroll", En),
            et(A, "scroll", wn),
            et(A, "mousedown",
                function() {
                    Pt && setTimeout(er, 0)
                });
        var fn = et(window, "resize",
            function() {
                kt.parentNode ? or(!0) : fn()
            },
            !0);
        et(E, "keyup", pi(Dn)),
            et(E, "input", Qn),
            et(E, "keydown", pi(Mn)),
            et(E, "keypress", pi(_n)),
            et(E, "focus", Pn),
            et(E, "blur", Hn),
            s.dragDrop && (et(Ct, "dragstart", Nn), et(Ct, "dragenter", ln), et(Ct, "dragover", ln), et(Ct, "drop", pi(Tn))),
            et(Ct, "paste",
                function() {
                    er(),
                        Qn()
                }),
            et(E, "paste",
                function() {
                    zt = !0,
                        Qn()
                }),
            et(E, "cut", pi(function() {
                s.readOnly || Xn("")
            })),
            S && et(bt, "mouseup",
                function() {
                    document.activeElement == E && E.blur(),
                        er()
                });
        var cn;
        try {
            cn = document.activeElement == E
        } catch(hn) {}
        cn || s.autofocus ? setTimeout(Pn, 20) : Hn();
        var dn = kt.CodeMirror = {
                getValue: bn,
                setValue: pi(yn),
                getSelection: Jn,
                replaceSelection: pi(Xn),
                focus: function() {
                    window.focus(),
                        er(),
                        Pn(),
                        Qn()
                },
                setOption: function(e, t) {
                    var n = s[e];
                    s[e] = t,
                        e == "mode" || e == "indentUnit" ? Cr() : e == "readOnly" && t == "nocursor" ? (Hn(), E.blur()) : e == "readOnly" && !t ? Zn(!0) : e == "theme" ? Ar() : e == "lineWrapping" && n != t ? pi(Lr)() : e == "tabSize" ? or(!0) : e == "keyMap" ? Or() : e == "tabindex" && (E.tabIndex = t);
                    if (e == "lineNumbers" || e == "gutter" || e == "firstLineNumber" || e == "theme" || e == "lineNumberFormatter") kr(),
                        or(!0)
                },
                getOption: function(e) {
                    return s[e]
                },
                getMode: function() {
                    return Mt
                },
                undo: pi(Fn),
                redo: pi(In),
                indentLine: pi(function(e, t) {
                    typeof t != "string" && (t == null ? t = s.smartIndent ? "smart": "prev": t = t ? "add": "subtract"),
                        pn(e) && Nr(e, t)
                }),
                indentSelection: pi(Tr),
                historySize: function() {
                    return {
                        undo: an.done.length,
                        redo: an.undone.length
                    }
                },
                clearHistory: function() {
                    an = new X
                },
                setHistory: function(e) {
                    an = new X,
                        an.done = e.done,
                        an.undone = e.undone
                },
                getHistory: function() {
                    function e(e) {
                        for (var t = 0,
                                 n = [], r; t < e.length; ++t) {
                            n.push(r = []);
                            for (var i = 0,
                                     s = e[t]; i < s.length; ++i) {
                                var o = [],
                                    u = s[i];
                                r.push({
                                    start: u.start,
                                    added: u.added,
                                    old: o
                                });
                                for (var a = 0; a < u.old.length; ++a) o.push(_(u.old[a]))
                            }
                        }
                        return n
                    }
                    return {
                        done: e(an.done),
                        undone: e(an.undone)
                    }
                },
                matchBrackets: pi(function() {
                    si(!0)
                }),
                getTokenAt: pi(function(e) {
                    return e = gr(e),
                        vn(e.line).getTokenAt(Mt, ui(e.line), s.tabSize, e.ch)
                }),
                getStateAfter: function(e) {
                    return e = mr(e == null ? _t.size - 1 : e),
                        ui(e + 1)
                },
                cursorCoords: function(e, t) {
                    return e == null && (e = Ht.inverted),
                        this.charCoords(e ? Ht.from: Ht.to, t)
                },
                charCoords: function(e, t) {
                    return e = gr(e),
                        t == "local" ? Ur(e, !1) : t == "div" ? Ur(e, !0) : Wr(e)
                },
                coordsChar: function(e) {
                    var t = ut(K);
                    return zr(e.x - t.left, e.y - t.top)
                },
                markText: pi(_r),
                setBookmark: Dr,
                findMarksAt: Pr,
                setMarker: pi(Hr),
                clearMarker: pi(Br),
                setLineClass: pi(Fr),
                hideLine: pi(function(e) {
                    return Ir(e, !0)
                }),
                showLine: pi(function(e) {
                    return Ir(e, !1)
                }),
                onDeleteLine: function(e, t) {
                    if (typeof e == "number") {
                        if (!pn(e)) return null;
                        e = vn(e)
                    }
                    return (e.handlers || (e.handlers = [])).push(t),
                        e
                },
                lineInfo: qr,
                getViewport: function() {
                    return {
                        from: Yt,
                        to: Zt
                    }
                },
                addWidget: function(e, t, n, r, i) {
                    e = Ur(gr(e));
                    var s = e.yBot,
                        o = e.x;
                    t.style.position = "absolute",
                        bt.appendChild(t);
                    if (r == "over") s = e.y;
                    else if (r == "near") {
                        var u = Math.max(Ct.offsetHeight, _t.height * Jr()),
                            a = Math.max(bt.clientWidth, K.clientWidth) - Zr();
                        e.yBot + t.offsetHeight > u && e.y > t.offsetHeight && (s = e.y - t.offsetHeight),
                            o + t.offsetWidth > a && (o = a - t.offsetWidth)
                    }
                    t.style.top = s + Yr() + "px",
                        t.style.left = t.style.right = "",
                        i == "right" ? (o = bt.clientWidth - t.offsetWidth, t.style.right = "0px") : (i == "left" ? o = 0 : i == "middle" && (o = (bt.clientWidth - t.offsetWidth) / 2), t.style.left = o + Zr() + "px"),
                        n && rr(o, s, o + t.offsetWidth, s + t.offsetHeight)
                },
                lineCount: function() {
                    return _t.size
                },
                clipPos: gr,
                getCursor: function(e) {
                    return e == null && (e = Ht.inverted),
                        vt(e ? Ht.from: Ht.to)
                },
                somethingSelected: function() {
                    return ! pt(Ht.from, Ht.to)
                },
                setCursor: pi(function(e, t, n) {
                    t == null && typeof e.line == "number" ? vr(e.line, e.ch, n) : vr(e, t, n)
                }),
                setSelection: pi(function(e, t, n) { (n ? hr: pr)(gr(e), gr(t || e))
                }),
                getLine: function(e) {
                    if (pn(e)) return vn(e).text
                },
                getLineHandle: function(e) {
                    if (pn(e)) return vn(e)
                },
                setLine: pi(function(e, t) {
                    pn(e) && Wn(t, {
                            line: e,
                            ch: 0
                        },
                        {
                            line: e,
                            ch: vn(e).text.length
                        })
                }),
                removeLine: pi(function(e) {
                    pn(e) && Wn("", {
                            line: e,
                            ch: 0
                        },
                        gr({
                            line: e + 1,
                            ch: 0
                        }))
                }),
                replaceRange: pi(Wn),
                getRange: function(e, t, n) {
                    return $n(gr(e), gr(t), n)
                },
                triggerOnKeyDown: pi(Mn),
                execCommand: function(e) {
                    return a[e](dn)
                },
                moveH: pi(br),
                deleteH: pi(wr),
                moveV: pi(Er),
                toggleOverwrite: function() {
                    Rt ? (Rt = !1, B.className = B.className.replace(" CodeMirror-overwrite", "")) : (Rt = !0, B.className += " CodeMirror-overwrite")
                },
                posFromIndex: function(e) {
                    var t = 0,
                        n;
                    return _t.iter(0, _t.size,
                        function(r) {
                            var i = r.text.length + 1;
                            if (i > e) return n = e,
                                !0;
                            e -= i,
                                ++t
                        }),
                        gr({
                            line: t,
                            ch: n
                        })
                },
                indexFromPos: function(e) {
                    if (e.line < 0 || e.ch < 0) return 0;
                    var t = e.ch;
                    return _t.iter(0, e.line,
                        function(e) {
                            t += e.text.length + 1
                        }),
                        t
                },
                scrollTo: function(e, t) {
                    e != null && (Ct.scrollLeft = e),
                        t != null && (A.scrollTop = Ct.scrollTop = t),
                        or([])
                },
                getScrollInfo: function() {
                    return {
                        x: Ct.scrollLeft,
                        y: A.scrollTop,
                        height: A.scrollHeight,
                        width: Ct.scrollWidth
                    }
                },
                setSize: function(e, t) {
                    function n(e) {
                        return e = String(e),
                            /^\d+$/.test(e) ? e + "px": e
                    }
                    e != null && (kt.style.width = n(e)),
                        t != null && (Ct.style.height = n(t)),
                        dn.refresh()
                },
                operation: function(e) {
                    return pi(e)()
                },
                compoundChange: function(e) {
                    return di(e)
                },
                refresh: function() {
                    or(!0, null, It),
                        A.scrollHeight > It && (A.scrollTop = It)
                },
                getInputField: function() {
                    return E
                },
                getWrapperElement: function() {
                    return kt
                },
                getScrollerElement: function() {
                    return Ct
                },
                getGutterElement: function() {
                    return ot
                }
            },
            kn,
            On = null,
            Gn = "";
        Mr.prototype.clear = pi(function() {
            var e = Infinity,
                t = -Infinity;
            for (var n = 0; n < this.lines.length; ++n) {
                var r = this.lines[n],
                    i = L(r.markedSpans, this, !0);
                if (i.from != null || i.to != null) {
                    var s = U(r);
                    e = Math.min(e, s),
                        t = Math.max(t, s)
                }
            }
            e != Infinity && Vt.push({
                from: e,
                to: t + 1
            }),
                this.lines.length = 0
        }),
            Mr.prototype.find = function() {
                var e, t;
                for (var n = 0; n < this.lines.length; ++n) {
                    var r = this.lines[n],
                        i = L(r.markedSpans, this);
                    if (i.from != null || i.to != null) {
                        var s = U(r);
                        i.from != null && (e = {
                            line: s,
                            ch: i.from
                        }),
                            i.to != null && (t = {
                                line: s,
                                ch: i.to
                            })
                    }
                }
                return this.type == "bookmark" ? e: e && {
                    from: e,
                    to: t
                }
            };
        var Xr, Vr, $r, Kr, Qr = 0,
            ti, ii = {
                "(": ")>",
                ")": "(<",
                "[": "]>",
                "]": "[<",
                "{": "}>",
                "}": "{<"
            },
            hi = 0;
        for (var vi in o) o.propertyIsEnumerable(vi) && !dn.propertyIsEnumerable(vi) && (dn[vi] = o[vi]);
        return dn
    }
    function l(e) {
        return typeof e == "string" ? f[e] : e
    }
    function c(e, t, n, r, i) {
        function s(t) {
            t = l(t);
            var n = t[e];
            if (n === !1) return i && i(),
                !0;
            if (n != null && r(n)) return ! 0;
            if (t.nofallthrough) return i && i(),
                !0;
            var o = t.fallthrough;
            if (o == null) return ! 1;
            if (Object.prototype.toString.call(o) != "[object Array]") return s(o);
            for (var u = 0,
                     a = o.length; u < a; ++u) if (s(o[u])) return ! 0;
            return ! 1
        }
        return t && s(t) ? !0 : s(n)
    }
    function h(e) {
        var t = Nt[Z(e, "keyCode")];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod"
    }
    function T(e, t) {
        if (t === !0) return t;
        if (e.copyState) return e.copyState(t);
        var n = {};
        for (var r in t) {
            var i = t[r];
            i instanceof Array && (i = i.concat([])),
                n[r] = i
        }
        return n
    }
    function N(e, t, n) {
        return e.startState ? e.startState(t, n) : !0
    }
    function C(e, t) {
        this.pos = this.start = 0,
            this.string = e,
            this.tabSize = t || 8
    }
    function k(e, t, n) {
        this.from = e,
            this.to = t,
            this.marker = n
    }
    function L(e, t, n) {
        if (e) for (var r = 0; r < e.length; ++r) {
            var i = e[r];
            if (i.marker == t) return n && e.splice(r, 1),
                i
        }
    }
    function A(e, t, n) {
        if (e) for (var r = 0,
                        i; r < e.length; ++r) {
            var s = e[r],
                o = s.marker,
                u = s.from == null || (o.inclusiveLeft ? s.from <= t: s.from < t);
            if (u || o.type == "bookmark" && s.from == t && s.from != n) {
                var a = s.to == null || (o.inclusiveRight ? s.to >= t: s.to > t); (i || (i = [])).push({
                    from: s.from,
                    to: a ? null: s.to,
                    marker: o
                })
            }
        }
        return i
    }
    function O(e, t) {
        if (e) for (var n = 0,
                        r; n < e.length; ++n) {
            var i = e[n],
                s = i.marker,
                o = i.to == null || (s.inclusiveRight ? i.to >= t: i.to > t);
            if (o || s.type == "bookmark" && i.from == t) {
                var u = i.from == null || (s.inclusiveLeft ? i.from <= t: i.from < t); (r || (r = [])).push({
                    from: u ? null: i.from - t,
                    to: i.to == null ? null: i.to - t,
                    marker: s
                })
            }
        }
        return r
    }
    function M(e, t, n, r, i) {
        if (!e && !t) return i;
        var s = A(e, n),
            o = O(t, r),
            u = i.length == 1,
            a = ct(i).length + (u ? n: 0);
        if (s) for (var f = 0; f < s.length; ++f) {
            var l = s[f];
            if (l.to == null) {
                var c = L(o, l.marker);
                c ? u && (l.to = c.to == null ? null: c.to + a) : l.to = n
            }
        }
        if (o) for (var f = 0; f < o.length; ++f) {
            var l = o[f];
            l.to != null && (l.to += a);
            if (l.from == null) {
                var c = L(s, l.marker);
                c || (l.from = a, u && (s || (s = [])).push(l))
            } else l.from += a,
                u && (s || (s = [])).push(l)
        }
        var h = [P(i[0], s)];
        if (!u) {
            var p = i.length - 2,
                d;
            if (p > 0 && s) for (var f = 0; f < s.length; ++f) s[f].to == null && (d || (d = [])).push({
                from: null,
                to: null,
                marker: s[f].marker
            });
            for (var f = 0; f < p; ++f) h.push(P(i[f + 1], d));
            h.push(P(ct(i), o))
        }
        return h
    }
    function _(e) {
        return typeof e == "string" ? e: e.text
    }
    function D(e) {
        return typeof e == "string" ? null: e.markedSpans
    }
    function P(e, t) {
        return t ? {
            text: e,
            markedSpans: t
        }: e
    }
    function H(e) {
        var t = e.markedSpans;
        if (!t) return;
        for (var n = 0; n < t.length; ++n) {
            var r = t[n].marker.lines,
                i = Et(r, e);
            r.splice(i, 1)
        }
        e.markedSpans = null
    }
    function B(e, t) {
        if (!t) return;
        for (var n = 0; n < t.length; ++n) var r = t[n].marker.lines.push(e);
        e.markedSpans = t
    }
    function F(e, t) {
        this.text = e,
            this.height = 1,
            B(this, t)
    }
    function I(e) {
        this.lines = e,
            this.parent = null;
        for (var t = 0,
                 n = e.length,
                 r = 0; t < n; ++t) e[t].parent = this,
            r += e[t].height;
        this.height = r
    }
    function q(e) {
        this.children = e;
        var t = 0,
            n = 0;
        for (var r = 0,
                 i = e.length; r < i; ++r) {
            var s = e[r];
            t += s.chunkSize(),
                n += s.height,
                s.parent = this
        }
        this.size = t,
            this.height = n,
            this.parent = null
    }
    function R(e, t) {
        while (!e.lines) for (var n = 0;; ++n) {
            var r = e.children[n],
                i = r.chunkSize();
            if (t < i) {
                e = r;
                break
            }
            t -= i
        }
        return e.lines[t]
    }
    function U(e) {
        if (e.parent == null) return null;
        var t = e.parent,
            n = Et(t.lines, e);
        for (var r = t.parent; r; t = r, r = r.parent) for (var i = 0,
                                                                s = r.children.length;; ++i) {
            if (r.children[i] == t) break;
            n += r.children[i].chunkSize()
        }
        return n
    }
    function z(e, t) {
        var n = 0;
        e: do {
            for (var r = 0,
                     i = e.children.length; r < i; ++r) {
                var s = e.children[r],
                    o = s.height;
                if (t < o) {
                    e = s;
                    continue e
                }
                t -= o,
                    n += s.chunkSize()
            }
            return n
        } while (! e . lines );
        for (var r = 0,
                 i = e.lines.length; r < i; ++r) {
            var u = e.lines[r],
                a = u.height;
            if (t < a) break;
            t -= a
        }
        return n + r
    }
    function W(e, t) {
        var n = 0;
        e: do {
            for (var r = 0,
                     i = e.children.length; r < i; ++r) {
                var s = e.children[r],
                    o = s.chunkSize();
                if (t < o) {
                    e = s;
                    continue e
                }
                t -= o,
                    n += s.height
            }
            return n
        } while (! e . lines );
        for (var r = 0; r < t; ++r) n += e.lines[r].height;
        return n
    }
    function X() {
        this.time = 0,
            this.done = [],
            this.undone = [],
            this.compound = 0,
            this.closed = !1
    }
    function V() {
        Q(this)
    }
    function $(e) {
        return e.stop || (e.stop = V),
            e
    }
    function J(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }
    function K(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }
    function Q(e) {
        J(e),
            K(e)
    }
    function G(e) {
        return e.target || e.srcElement
    }
    function Y(e) {
        var t = e.which;
        return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)),
            n && e.ctrlKey && t == 1 && (t = 3),
            t
    }
    function Z(e, t) {
        var n = e.override && e.override.hasOwnProperty(t);
        return n ? e.override[t] : e[t]
    }
    function et(e, t, n, r) {
        if (typeof e.addEventListener == "function") {
            e.addEventListener(t, n, !1);
            if (r) return function() {
                e.removeEventListener(t, n, !1)
            }
        } else {
            var i = function(e) {
                n(e || window.event)
            };
            e.attachEvent("on" + t, i);
            if (r) return function() {
                e.detachEvent("on" + t, i)
            }
        }
    }
    function tt() {
        this.id = null
    }
    function ot(e, t, n) {
        t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var r = 0,
                 i = 0; r < t; ++r) e.charAt(r) == "	" ? i += n - i % n: ++i;
        return i
    }
    function ut(e, t) {
        try {
            var n = e.getBoundingClientRect();
            n = {
                top: n.top,
                left: n.left
            }
        } catch(r) {
            n = {
                top: 0,
                left: 0
            }
        }
        if (!t) if (window.pageYOffset == null) {
            var i = document.documentElement || document.body.parentNode;
            i.scrollTop == null && (i = document.body),
                n.top += i.scrollTop,
                n.left += i.scrollLeft
        } else n.top += window.pageYOffset,
            n.left += window.pageXOffset;
        return n
    }
    function at(e) {
        return e.textContent || e.innerText || e.nodeValue || ""
    }
    function lt(e) {
        while (ft.length <= e) ft.push(ct(ft) + " ");
        return ft[e]
    }
    function ct(e) {
        return e[e.length - 1]
    }
    function ht(e) {
        t ? (e.selectionStart = 0, e.selectionEnd = e.value.length) : e.select()
    }
    function pt(e, t) {
        return e.line == t.line && e.ch == t.ch
    }
    function dt(e, t) {
        return e.line < t.line || e.line == t.line && e.ch < t.ch
    }
    function vt(e) {
        return {
            line: e.line,
            ch: e.ch
        }
    }
    function mt(e, t, n, r) {
        var i = document.createElement(e);
        n && (i.className = n),
            r && (i.style.cssText = r);
        if (typeof t == "string") bt(i, t);
        else if (t) for (var s = 0; s < t.length; ++s) i.appendChild(t[s]);
        return i
    }
    function gt(e) {
        return e.innerHTML = "",
            e
    }
    function yt(e, t) {
        gt(e).appendChild(t)
    }
    function bt(e, t) {
        m ? (e.innerHTML = "", e.appendChild(document.createTextNode(t))) : e.textContent = t
    }
    function wt(e, t) {
        if (!t) return 0;
        if (!e) return t.length;
        for (var n = e.length,
                 r = t.length; n >= 0 && r >= 0; --n, --r) if (e.charAt(n) != t.charAt(r)) break;
        return r + 1
    }
    function Et(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0,
                 r = e.length; n < r; ++n) if (e[n] == t) return n;
        return - 1
    }
    function St(e) {
        return /\w/.test(e) || e.toUpperCase() != e.toLowerCase()
    }
    e.defaults = {
        value: "",
        mode: null,
        theme: "default",
        indentUnit: 2,
        indentWithTabs: !1,
        smartIndent: !0,
        tabSize: 4,
        keyMap: "default",
        extraKeys: null,
        electricChars: !0,
        autoClearEmptyLines: !1,
        onKeyEvent: null,
        onDragEvent: null,
        lineWrapping: !1,
        lineNumbers: !1,
        gutter: !1,
        fixedGutter: !1,
        firstLineNumber: 1,
        readOnly: !1,
        dragDrop: !0,
        onChange: null,
        onCursorActivity: null,
        onViewportChange: null,
        onGutterClick: null,
        onUpdate: null,
        onFocus: null,
        onBlur: null,
        onScroll: null,
        matchBrackets: !1,
        cursorBlinkRate: 530,
        workTime: 100,
        workDelay: 200,
        pollInterval: 100,
        undoDepth: 40,
        tabindex: null,
        autofocus: null,
        lineNumberFormatter: function(e) {
            return e
        }
    };
    var t = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
        n = t || /Mac/.test(navigator.platform),
        r = /Win/.test(navigator.platform),
        i = e.modes = {},
        s = e.mimeModes = {};
    e.defineMode = function(t, n) { ! e.defaults.mode && t != "null" && (e.defaults.mode = t);
        if (arguments.length > 2) {
            n.dependencies = [];
            for (var r = 2; r < arguments.length; ++r) n.dependencies.push(arguments[r])
        }
        i[t] = n
    },
        e.defineMIME = function(e, t) {
            s[e] = t
        },
        e.resolveMode = function(t) {
            if (typeof t == "string" && s.hasOwnProperty(t)) t = s[t];
            else if (typeof t == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
            return typeof t == "string" ? {
                name: t
            }: t || {
                name: "null"
            }
        },
        e.getMode = function(t, n) {
            var n = e.resolveMode(n),
                r = i[n.name];
            if (!r) return e.getMode(t, "text/plain");
            var s = r(t, n);
            if (u.hasOwnProperty(n.name)) {
                var o = u[n.name];
                for (var a in o) o.hasOwnProperty(a) && (s[a] = o[a])
            }
            return s.name = n.name,
                s
        },
        e.listModes = function() {
            var e = [];
            for (var t in i) i.propertyIsEnumerable(t) && e.push(t);
            return e
        },
        e.listMIMEs = function() {
            var e = [];
            for (var t in s) s.propertyIsEnumerable(t) && e.push({
                mime: t,
                mode: s[t]
            });
            return e
        };
    var o = e.extensions = {};
    e.defineExtension = function(e, t) {
        o[e] = t
    };
    var u = e.modeExtensions = {};
    e.extendMode = function(e, t) {
        var n = u.hasOwnProperty(e) ? u[e] : u[e] = {};
        for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r])
    };
    var a = e.commands = {
            selectAll: function(e) {
                e.setSelection({
                        line: 0,
                        ch: 0
                    },
                    {
                        line: e.lineCount() - 1
                    })
            },
            killLine: function(e) {
                var t = e.getCursor(!0),
                    n = e.getCursor(!1),
                    r = !pt(t, n); ! r && e.getLine(t.line).length == t.ch ? e.replaceRange("", t, {
                    line: t.line + 1,
                    ch: 0
                }) : e.replaceRange("", t, r ? n: {
                    line: t.line
                })
            },
            deleteLine: function(e) {
                var t = e.getCursor().line;
                e.replaceRange("", {
                        line: t,
                        ch: 0
                    },
                    {
                        line: t
                    })
            },
            undo: function(e) {
                e.undo()
            },
            redo: function(e) {
                e.redo()
            },
            goDocStart: function(e) {
                e.setCursor(0, 0, !0)
            },
            goDocEnd: function(e) {
                e.setSelection({
                        line: e.lineCount() - 1
                    },
                    null, !0)
            },
            goLineStart: function(e) {
                e.setCursor(e.getCursor().line, 0, !0)
            },
            goLineStartSmart: function(e) {
                var t = e.getCursor(),
                    n = e.getLine(t.line),
                    r = Math.max(0, n.search(/\S/));
                e.setCursor(t.line, t.ch <= r && t.ch ? 0 : r, !0)
            },
            goLineEnd: function(e) {
                e.setSelection({
                        line: e.getCursor().line
                    },
                    null, !0)
            },
            goLineUp: function(e) {
                e.moveV( - 1, "line")
            },
            goLineDown: function(e) {
                e.moveV(1, "line")
            },
            goPageUp: function(e) {
                e.moveV( - 1, "page")
            },
            goPageDown: function(e) {
                e.moveV(1, "page")
            },
            goCharLeft: function(e) {
                e.moveH( - 1, "char")
            },
            goCharRight: function(e) {
                e.moveH(1, "char")
            },
            goColumnLeft: function(e) {
                e.moveH( - 1, "column")
            },
            goColumnRight: function(e) {
                e.moveH(1, "column")
            },
            goWordLeft: function(e) {
                e.moveH( - 1, "word")
            },
            goWordRight: function(e) {
                e.moveH(1, "word")
            },
            delCharLeft: function(e) {
                e.deleteH( - 1, "char")
            },
            delCharRight: function(e) {
                e.deleteH(1, "char")
            },
            delWordLeft: function(e) {
                e.deleteH( - 1, "word")
            },
            delWordRight: function(e) {
                e.deleteH(1, "word")
            },
            indentAuto: function(e) {
                e.indentSelection("smart")
            },
            indentMore: function(e) {
                e.indentSelection("add")
            },
            indentLess: function(e) {
                e.indentSelection("subtract")
            },
            insertTab: function(e) {
                e.replaceSelection("	", "end")
            },
            defaultTab: function(e) {
                e.somethingSelected() ? e.indentSelection("add") : e.replaceSelection("	", "end")
            },
            transposeChars: function(e) {
                var t = e.getCursor(),
                    n = e.getLine(t.line);
                t.ch > 0 && t.ch < n.length - 1 && e.replaceRange(n.charAt(t.ch) + n.charAt(t.ch - 1), {
                        line: t.line,
                        ch: t.ch - 1
                    },
                    {
                        line: t.line,
                        ch: t.ch + 1
                    })
            },
            newlineAndIndent: function(e) {
                e.replaceSelection("\n", "end"),
                    e.indentLine(e.getCursor().line)
            },
            toggleOverwrite: function(e) {
                e.toggleOverwrite()
            }
        },
        f = e.keyMap = {};
    f.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharRight",
        Backspace: "delCharLeft",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    },
        f.pcDefault = {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Alt-Up": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Down": "goDocEnd",
            "Ctrl-Left": "goWordLeft",
            "Ctrl-Right": "goWordRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delWordLeft",
            "Ctrl-Delete": "delWordRight",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            fallthrough: "basic"
        },
        f.macDefault = {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goWordLeft",
            "Alt-Right": "goWordRight",
            "Cmd-Left": "goLineStart",
            "Cmd-Right": "goLineEnd",
            "Alt-Backspace": "delWordLeft",
            "Ctrl-Alt-Backspace": "delWordRight",
            "Alt-Delete": "delWordRight",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            fallthrough: ["basic", "emacsy"]
        },
        f["default"] = n ? f.macDefault: f.pcDefault,
        f.emacsy = {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Alt-F": "goWordRight",
            "Alt-B": "goWordLeft",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageUp",
            "Shift-Ctrl-V": "goPageDown",
            "Ctrl-D": "delCharRight",
            "Ctrl-H": "delCharLeft",
            "Alt-D": "delWordRight",
            "Alt-Backspace": "delWordLeft",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars"
        },
        e.isModifierKey = h,
        e.fromTextArea = function(t, n) {
            function s() {
                t.value = a.getValue()
            }
            n || (n = {}),
                n.value = t.value,
                !n.tabindex && t.tabindex && (n.tabindex = t.tabindex);
            if (n.autofocus == null) {
                var r = document.body;
                try {
                    r = document.activeElement
                } catch(i) {}
                n.autofocus = r == t || t.getAttribute("autofocus") != null && r == document.body
            }
            if (t.form) {
                var o = et(t.form, "submit", s, !0);
                if (typeof t.form.submit == "function") {
                    var u = t.form.submit;
                    t.form.submit = function f() {
                        s(),
                            t.form.submit = u,
                            t.form.submit(),
                            t.form.submit = f
                    }
                }
            }
            t.style.display = "none";
            var a = e(function(e) {
                    t.parentNode.insertBefore(e, t.nextSibling)
                },
                n);
            return a.save = s,
                a.getTextArea = function() {
                    return t
                },
                a.toTextArea = function() {
                    s(),
                        t.parentNode.removeChild(a.getWrapperElement()),
                        t.style.display = "",
                        t.form && (o(), typeof t.form.submit == "function" && (t.form.submit = u))
                },
                a
        };
    var p = /gecko\/\d{7}/i.test(navigator.userAgent),
        d = /MSIE \d/.test(navigator.userAgent),
        v = /MSIE [1-7]\b/.test(navigator.userAgent),
        m = /MSIE [1-8]\b/.test(navigator.userAgent),
        g = d && document.documentMode == 5,
        y = /WebKit\//.test(navigator.userAgent),
        b = /Chrome\//.test(navigator.userAgent),
        w = /Opera\//.test(navigator.userAgent),
        E = /Apple Computer/.test(navigator.vendor),
        S = /KHTML\//.test(navigator.userAgent),
        x = /Mac OS X 10\D([7-9]|\d\d)\D/.test(navigator.userAgent);
    e.copyState = T,
        e.startState = N,
        e.innerMode = function(e, t) {
            while (e.innerMode) {
                var n = e.innerMode(t);
                t = n.state,
                    e = n.mode
            }
            return n || {
                mode: e,
                state: t
            }
        },
        C.prototype = {
            eol: function() {
                return this.pos >= this.string.length
            },
            sol: function() {
                return this.pos == 0
            },
            peek: function() {
                return this.string.charAt(this.pos) || undefined
            },
            next: function() {
                if (this.pos < this.string.length) return this.string.charAt(this.pos++)
            },
            eat: function(e) {
                var t = this.string.charAt(this.pos);
                if (typeof e == "string") var n = t == e;
                else var n = t && (e.test ? e.test(t) : e(t));
                if (n) return++this.pos,
                    t
            },
            eatWhile: function(e) {
                var t = this.pos;
                while (this.eat(e));
                return this.pos > t
            },
            eatSpace: function() {
                var e = this.pos;
                while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;
                return this.pos > e
            },
            skipToEnd: function() {
                this.pos = this.string.length
            },
            skipTo: function(e) {
                var t = this.string.indexOf(e, this.pos);
                if (t > -1) return this.pos = t,
                    !0
            },
            backUp: function(e) {
                this.pos -= e
            },
            column: function() {
                return ot(this.string, this.start, this.tabSize)
            },
            indentation: function() {
                return ot(this.string, null, this.tabSize)
            },
            match: function(e, t, n) {
                if (typeof e != "string") {
                    var i = this.string.slice(this.pos).match(e);
                    return i && i.index > 0 ? null: (i && t !== !1 && (this.pos += i[0].length), i)
                }
                var r = function(e) {
                    return n ? e.toLowerCase() : e
                };
                if (r(this.string).indexOf(r(e), this.pos) == this.pos) return t !== !1 && (this.pos += e.length),
                    !0
            },
            current: function() {
                return this.string.slice(this.start, this.pos)
            }
        },
        e.StringStream = C;
    var j = " ";
    p || d && !v ? j = "\u200b": w && (j = ""),
        F.prototype = {
            update: function(e, t) {
                this.text = e,
                    this.stateAfter = this.styles = null,
                    H(this),
                    B(this, t)
            },
            highlight: function(e, t, n) {
                var r = new C(this.text, n),
                    i = this.styles || (this.styles = []),
                    s = i.length = 0;
                this.text == "" && e.blankLine && e.blankLine(t);
                while (!r.eol()) {
                    var o = e.token(r, t),
                        u = r.current();
                    r.start = r.pos,
                        s && i[s - 1] == o ? i[s - 2] += u: u && (i[s++] = u, i[s++] = o);
                    if (r.pos > 5e3) {
                        i[s++] = this.text.slice(r.pos),
                            i[s++] = null;
                        break
                    }
                }
            },
            process: function(e, t, n) {
                var r = new C(this.text, n);
                this.text == "" && e.blankLine && e.blankLine(t);
                while (!r.eol() && r.pos <= 5e3) e.token(r, t),
                    r.start = r.pos
            },
            getTokenAt: function(e, t, n, r) {
                var i = this.text,
                    s = new C(i, n);
                while (s.pos < r && !s.eol()) {
                    s.start = s.pos;
                    var o = e.token(s, t)
                }
                return {
                    start: s.start,
                    end: s.pos,
                    string: s.current(),
                    className: o || null,
                    state: t
                }
            },
            indentation: function(e) {
                return ot(this.text, null, e)
            },
            getContent: function(e, t, n) {
                function u(t, n, o) {
                    if (!n) return;
                    r && d && n.charAt(0) == " " && (n = "\u00a0" + n.slice(1)),
                        r = !1;
                    if (!s.test(n)) {
                        i += n.length;
                        var u = document.createTextNode(n)
                    } else {
                        var u = document.createDocumentFragment(),
                            a = 0;
                        for (;;) {
                            s.lastIndex = a;
                            var f = s.exec(n),
                                l = f ? f.index - a: n.length - a;
                            l && (u.appendChild(document.createTextNode(n.slice(a, a + l))), i += l);
                            if (!f) break;
                            a += l + 1;
                            if (f[0] == "	") {
                                var c = e - i % e;
                                u.appendChild(mt("span", lt(c), "cm-tab")),
                                    i += c
                            } else {
                                var h = mt("span", "\u2022", "cm-invalidchar");
                                h.title = "\\u" + f[0].charCodeAt(0).toString(16),
                                    u.appendChild(h),
                                    i += 1
                            }
                        }
                    }
                    o ? t.appendChild(mt("span", [u], o)) : t.appendChild(u)
                }
                function m(e) {
                    return e ? "cm-" + e.replace(/ +/g, " cm-") : null
                }
                var r = !0,
                    i = 0,
                    s = /[\t\u0000-\u0019\u200b\u2028\u2029\uFEFF]/g,
                    o = mt("pre"),
                    a = u;
                if (t != null) {
                    var f = 0,
                        l = o.anchor = mt("span");
                    a = function(e, r, i) {
                        var s = r.length;
                        if (t >= f && t < f + s) {
                            t > f && (u(e, r.slice(0, t - f), i), n && e.appendChild(mt("wbr"))),
                                e.appendChild(l);
                            var o = t - f;
                            u(l, w ? r.slice(o, o + 1) : r.slice(o), i),
                                w && u(e, r.slice(o + 1), i),
                                t--,
                                f += s
                        } else f += s,
                            u(e, r, i),
                            f == t && f == v ? (bt(l, j), e.appendChild(l)) : f > t + 10 && /\s/.test(r) && (a = function() {})
                    }
                }
                var c = this.styles,
                    h = this.text,
                    p = this.markedSpans,
                    v = h.length;
                if (!h && t == null) a(o, " ");
                else if (!p || !p.length) for (var g = 0,
                                                   y = 0; y < v; g += 2) {
                    var b = c[g],
                        E = c[g + 1],
                        S = b.length;
                    y + S > v && (b = b.slice(0, v - y)),
                        y += S,
                        a(o, b, m(E))
                } else {
                    p.sort(function(e, t) {
                        return e.from - t.from
                    });
                    var x = 0,
                        g = 0,
                        T = "",
                        E, N = 0,
                        C = p[0].from || 0,
                        k = [],
                        L = 0,
                        A = function() {
                            var e;
                            while (L < p.length && ((e = p[L]).from == x || e.from == null)) e.marker.type == "range" && k.push(e),
                                ++L;
                            C = L < p.length ? p[L].from: Infinity;
                            for (var t = 0; t < k.length; ++t) {
                                var n = k[t].to;
                                n == null && (n = Infinity),
                                    n == x ? k.splice(t--, 1) : C = Math.min(n, C)
                            }
                        },
                        O = 0;
                    while (x < v) {
                        C == x && A();
                        var M = Math.min(v, C);
                        for (;;) {
                            if (T) {
                                var _ = x + T.length,
                                    D = E;
                                for (var P = 0; P < k.length; ++P) {
                                    var H = k[P];
                                    D = (D ? D + " ": "") + H.marker.style,
                                        H.marker.endStyle && H.to === Math.min(_, M) && (D += " " + H.marker.endStyle),
                                        H.marker.startStyle && H.from === x && (D += " " + H.marker.startStyle)
                                }
                                a(o, _ > M ? T.slice(0, M - x) : T, D);
                                if (_ >= M) {
                                    T = T.slice(M - x),
                                        x = M;
                                    break
                                }
                                x = _
                            }
                            T = c[g++],
                                E = m(c[g++])
                        }
                    }
                }
                return o
            },
            cleanUp: function() {
                this.parent = null,
                    H(this)
            }
        },
        I.prototype = {
            chunkSize: function() {
                return this.lines.length
            },
            remove: function(e, t, n) {
                for (var r = e,
                         i = e + t; r < i; ++r) {
                    var s = this.lines[r];
                    this.height -= s.height,
                        s.cleanUp();
                    if (s.handlers) for (var o = 0; o < s.handlers.length; ++o) n.push(s.handlers[o])
                }
                this.lines.splice(e, t)
            },
            collapse: function(e) {
                e.splice.apply(e, [e.length, 0].concat(this.lines))
            },
            insertHeight: function(e, t, n) {
                this.height += n,
                    this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                for (var r = 0,
                         i = t.length; r < i; ++r) t[r].parent = this
            },
            iterN: function(e, t, n) {
                for (var r = e + t; e < r; ++e) if (n(this.lines[e])) return ! 0
            }
        },
        q.prototype = {
            chunkSize: function() {
                return this.size
            },
            remove: function(e, t, n) {
                this.size -= t;
                for (var r = 0; r < this.children.length; ++r) {
                    var i = this.children[r],
                        s = i.chunkSize();
                    if (e < s) {
                        var o = Math.min(t, s - e),
                            u = i.height;
                        i.remove(e, o, n),
                            this.height -= u - i.height,
                            s == o && (this.children.splice(r--, 1), i.parent = null);
                        if ((t -= o) == 0) break;
                        e = 0
                    } else e -= s
                }
                if (this.size - t < 25) {
                    var a = [];
                    this.collapse(a),
                        this.children = [new I(a)],
                        this.children[0].parent = this
                }
            },
            collapse: function(e) {
                for (var t = 0,
                         n = this.children.length; t < n; ++t) this.children[t].collapse(e)
            },
            insert: function(e, t) {
                var n = 0;
                for (var r = 0,
                         i = t.length; r < i; ++r) n += t[r].height;
                this.insertHeight(e, t, n)
            },
            insertHeight: function(e, t, n) {
                this.size += t.length,
                    this.height += n;
                for (var r = 0,
                         i = this.children.length; r < i; ++r) {
                    var s = this.children[r],
                        o = s.chunkSize();
                    if (e <= o) {
                        s.insertHeight(e, t, n);
                        if (s.lines && s.lines.length > 50) {
                            while (s.lines.length > 50) {
                                var u = s.lines.splice(s.lines.length - 25, 25),
                                    a = new I(u);
                                s.height -= a.height,
                                    this.children.splice(r + 1, 0, a),
                                    a.parent = this
                            }
                            this.maybeSpill()
                        }
                        break
                    }
                    e -= o
                }
            },
            maybeSpill: function() {
                if (this.children.length <= 10) return;
                var e = this;
                do {
                    var t = e.children.splice(e.children.length - 5, 5), n = new q(t);
                    if (!e.parent) {
                        var r = new q(e.children);
                        r.parent = e,
                            e.children = [r, n],
                            e = r
                    } else {
                        e.size -= n.size,
                            e.height -= n.height;
                        var i = Et(e.parent.children, e);
                        e.parent.children.splice(i + 1, 0, n)
                    }
                    n.parent = e.parent
                } while ( e . children . length > 10 );
                e.parent.maybeSpill()
            },
            iter: function(e, t, n) {
                this.iterN(e, t - e, n)
            },
            iterN: function(e, t, n) {
                for (var r = 0,
                         i = this.children.length; r < i; ++r) {
                    var s = this.children[r],
                        o = s.chunkSize();
                    if (e < o) {
                        var u = Math.min(t, o - e);
                        if (s.iterN(e, u, n)) return ! 0;
                        if ((t -= u) == 0) break;
                        e = 0
                    } else e -= o
                }
            }
        },
        X.prototype = {
            addChange: function(e, t, n) {
                this.undone.length = 0;
                var r = +(new Date),
                    i = ct(this.done),
                    s = i && ct(i),
                    o = r - this.time;
                if (this.compound && i && !this.closed) i.push({
                    start: e,
                    added: t,
                    old: n
                });
                else if (o > 400 || !s || this.closed || s.start > e + n.length || s.start + s.added < e) this.done.push([{
                    start: e,
                    added: t,
                    old: n
                }]),
                    this.closed = !1;
                else {
                    var u = Math.max(0, s.start - e),
                        a = Math.max(0, e + n.length - (s.start + s.added));
                    for (var f = u; f > 0; --f) s.old.unshift(n[f - 1]);
                    for (var f = a; f > 0; --f) s.old.push(n[n.length - f]);
                    u && (s.start = e),
                        s.added += t - (n.length - u - a)
                }
                this.time = r
            },
            startCompound: function() {
                this.compound++||(this.closed = !0)
            },
            endCompound: function() {--this.compound || (this.closed = !0)
            }
        },
        e.e_stop = Q,
        e.e_preventDefault = J,
        e.e_stopPropagation = K,
        e.connect = et,
        tt.prototype = {
            set: function(e, t) {
                clearTimeout(this.id),
                    this.id = setTimeout(t, e)
            }
        };
    var nt = e.Pass = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        },
        rt = function() {
            if (m) return ! 1;
            var e = mt("div");
            return "draggable" in e || "dragDrop" in e
        } (),
        it = function() {
            var e = mt("textarea");
            return e.value = "foo\nbar",
                e.value.indexOf("\r") > -1 ? "\r\n": "\n"
        } (),
        st = /^$/;
    p ? st = /$'/: E ? st = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/: b && (st = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/);
    var ft = [""],
        xt = "\n\nb".split(/\n/).length != 3 ?
            function(e) {
                var t = 0,
                    n = [],
                    r = e.length;
                while (t <= r) {
                    var i = e.indexOf("\n", t);
                    i == -1 && (i = e.length);
                    var s = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i),
                        o = s.indexOf("\r");
                    o != -1 ? (n.push(s.slice(0, o)), t += o + 1) : (n.push(s), t = i + 1)
                }
                return n
            }: function(e) {
            return e.split(/\r\n?|\n/)
        };
    e.splitLines = xt;
    var Tt = window.getSelection ?
        function(e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch(t) {
                return ! 1
            }
        }: function(e) {
        try {
            var t = e.ownerDocument.selection.createRange()
        } catch(n) {}
        return ! t || t.parentElement() != e ? !1 : t.compareEndPoints("StartToEnd", t) != 0
    };
    e.defineMode("null",
        function() {
            return {
                token: function(e) {
                    e.skipToEnd()
                }
            }
        }),
        e.defineMIME("text/plain", "null");
    var Nt = {
        3 : "Enter",
        8 : "Backspace",
        9 : "Tab",
        13 : "Enter",
        16 : "Shift",
        17 : "Ctrl",
        18 : "Alt",
        19 : "Pause",
        20 : "CapsLock",
        27 : "Esc",
        32 : "Space",
        33 : "PageUp",
        34 : "PageDown",
        35 : "End",
        36 : "Home",
        37 : "Left",
        38 : "Up",
        39 : "Right",
        40 : "Down",
        44 : "PrintScrn",
        45 : "Insert",
        46 : "Delete",
        59 : ";",
        91 : "Mod",
        92 : "Mod",
        93 : "Mod",
        109 : "-",
        107 : "=",
        127 : "Delete",
        186 : ";",
        187 : "=",
        188 : ",",
        189 : "-",
        190 : ".",
        191 : "/",
        192 : "`",
        219 : "[",
        220 : "\\",
        221 : "]",
        222 : "'",
        63276 : "PageUp",
        63277 : "PageDown",
        63275 : "End",
        63273 : "Home",
        63234 : "Left",
        63232 : "Up",
        63235 : "Right",
        63233 : "Down",
        63302 : "Insert",
        63272 : "Delete"
    };
    return e.keyNames = Nt,
        function() {
            for (var e = 0; e < 10; e++) Nt[e + 48] = String(e);
            for (var e = 65; e <= 90; e++) Nt[e] = String.fromCharCode(e);
            for (var e = 1; e <= 12; e++) Nt[e + 111] = Nt[e + 63235] = "F" + e
        } (),
        e.version = "2.34 +",
        e
} (),
    CodeMirror.defineMode("clike",
        function(e, t) {
            function c(e, t) {
                var n = e.next();
                if (u[n]) {
                    var a = u[n](e, t);
                    if (a !== !1) return a
                }
                if (n == '"' || n == "'") return t.tokenize = h(n),
                    t.tokenize(e, t);
                if (/[\[\]{}\(\),;\:\.]/.test(n)) return l = n,
                    null;
                if (/\d/.test(n)) return e.eatWhile(/[\w\.]/),
                    "number";
                if (n == "/") {
                    if (e.eat("*")) return t.tokenize = p,
                        p(e, t);
                    if (e.eat("/")) return e.skipToEnd(),
                        "comment"
                }
                if (f.test(n)) return e.eatWhile(f),
                    "operator";
                e.eatWhile(/[\w\$_]/);
                var c = e.current();
                return r.propertyIsEnumerable(c) ? (s.propertyIsEnumerable(c) && (l = "newstatement"), "keyword") : i.propertyIsEnumerable(c) ? (s.propertyIsEnumerable(c) && (l = "newstatement"), "builtin") : o.propertyIsEnumerable(c) ? "atom": "variable"
            }
            function h(e) {
                return function(t, n) {
                    var r = !1,
                        i, s = !1;
                    while ((i = t.next()) != null) {
                        if (i == e && !r) {
                            s = !0;
                            break
                        }
                        r = !r && i == "\\"
                    }
                    if (s || !r && !a) n.tokenize = null;
                    return "string"
                }
            }
            function p(e, t) {
                var n = !1,
                    r;
                while (r = e.next()) {
                    if (r == "/" && n) {
                        t.tokenize = null;
                        break
                    }
                    n = r == "*"
                }
                return "comment"
            }
            function d(e, t, n, r, i) {
                this.indented = e,
                    this.column = t,
                    this.type = n,
                    this.align = r,
                    this.prev = i
            }
            function v(e, t, n) {
                return e.context = new d(e.indented, t, n, null, e.context)
            }
            function m(e) {
                var t = e.context.type;
                if (t == ")" || t == "]" || t == "}") e.indented = e.context.indented;
                return e.context = e.context.prev
            }
            var n = e.indentUnit,
                r = t.keywords || {},
                i = t.builtin || {},
                s = t.blockKeywords || {},
                o = t.atoms || {},
                u = t.hooks || {},
                a = t.multiLineStrings,
                f = /[+\-*&%=<>!?|\/]/,
                l;
            return {
                startState: function(e) {
                    return {
                        tokenize: null,
                        context: new d((e || 0) - n, 0, "top", !1),
                        indented: 0,
                        startOfLine: !0
                    }
                },
                token: function(e, t) {
                    var n = t.context;
                    e.sol() && (n.align == null && (n.align = !1), t.indented = e.indentation(), t.startOfLine = !0);
                    if (e.eatSpace()) return null;
                    l = null;
                    var r = (t.tokenize || c)(e, t);
                    if (r == "comment" || r == "meta") return r;
                    n.align == null && (n.align = !0);
                    if (l != ";" && l != ":" || n.type != "statement") if (l == "{") v(t, e.column(), "}");
                    else if (l == "[") v(t, e.column(), "]");
                    else if (l == "(") v(t, e.column(), ")");
                    else if (l == "}") {
                        while (n.type == "statement") n = m(t);
                        n.type == "}" && (n = m(t));
                        while (n.type == "statement") n = m(t)
                    } else l == n.type ? m(t) : (n.type == "}" || n.type == "top" || n.type == "statement" && l == "newstatement") && v(t, e.column(), "statement");
                    else m(t);
                    return t.startOfLine = !1,
                        r
                },
                indent: function(e, t) {
                    if (e.tokenize == p) return CodeMirror.Pass;
                    if (e.tokenize != c && e.tokenize != null) return 0;
                    var r = e.context,
                        i = t && t.charAt(0);
                    r.type == "statement" && i == "}" && (r = r.prev);
                    var s = i == r.type;
                    return r.type == "statement" ? r.indented + (i == "{" ? 0 : n) : r.align ? r.column + (s ? 0 : 1) : r.indented + (s ? 0 : n)
                },
                electricChars: "{}"
            }
        }),
    function() {
        function e(e) {
            var t = {},
                n = e.split(" ");
            for (var r = 0; r < n.length; ++r) t[n[r]] = !0;
            return t
        }
        function n(e, t) {
            return t.startOfLine ? (e.skipToEnd(), "meta") : !1
        }
        function r(e, t) {
            var n;
            while ((n = e.next()) != null) if (n == '"' && !e.eat('"')) {
                t.tokenize = null;
                break
            }
            return "string"
        }
        function i(e, t) {
            for (var n = 0; n < e.length; ++n) CodeMirror.defineMIME(e[n], t)
        }
        var t = "auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";
        i(["text/x-csrc", "text/x-c", "text/x-chdr"], {
            name: "clike",
            keywords: e(t),
            blockKeywords: e("case do else for if switch while struct"),
            atoms: e("null"),
            hooks: {
                "#": n
            }
        }),
            i(["text/x-c++src", "text/x-c++hdr"], {
                name: "clike",
                keywords: e(t + " asm dynamic_cast namespace reinterpret_cast try bool explicit new " + "static_cast typeid catch operator template typename class friend private " + "this using const_cast inline public throw virtual delete mutable protected " + "wchar_t"),
                blockKeywords: e("catch class do else finally for if struct switch try while"),
                atoms: e("true false null"),
                hooks: {
                    "#": n
                }
            }),
            CodeMirror.defineMIME("text/x-java", {
                name: "clike",
                keywords: e("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),
                blockKeywords: e("catch class do else finally for if switch try while"),
                atoms: e("true false null"),
                hooks: {
                    "@": function(e, t) {
                        return e.eatWhile(/[\w\$_]/),
                            "meta"
                    }
                }
            }),
            CodeMirror.defineMIME("text/x-csharp", {
                name: "clike",
                keywords: e("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
                blockKeywords: e("catch class do else finally for foreach if struct switch try while"),
                builtin: e("Boolean Byte Char DateTime DateTimeOffset Decimal Double Guid Int16 Int32 Int64 Object SByte Single String TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
                atoms: e("true false null"),
                hooks: {
                    "@": function(e, t) {
                        return e.eat('"') ? (t.tokenize = r, r(e, t)) : (e.eatWhile(/[\w\$_]/), "meta")
                    }
                }
            }),
            CodeMirror.defineMIME("text/x-scala", {
                name: "clike",
                keywords: e("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
                blockKeywords: e("catch class do else finally for forSome if match switch try while"),
                atoms: e("true false null"),
                hooks: {
                    "@": function(e, t) {
                        return e.eatWhile(/[\w\$_]/),
                            "meta"
                    }
                }
            })
    } (),
    CodeMirror.defineMode("clojure",
        function(e, t) {
            function h(e) {
                var t = {},
                    n = e.split(" ");
                for (var r = 0; r < n.length; ++r) t[n[r]] = !0;
                return t
            }
            function y(e, t, n) {
                this.indent = e,
                    this.type = t,
                    this.prev = n
            }
            function b(e, t, n) {
                e.indentStack = new y(t, n, e.indentStack)
            }
            function w(e) {
                e.indentStack = e.indentStack.prev
            }
            function E(e, t) {
                return e === "0" && t.eat(/x/i) ? (t.eatWhile(g.hex), !0) : ((e == "+" || e == "-") && g.digit.test(t.peek()) && (t.eat(g.sign), e = t.next()), g.digit.test(e) ? (t.eat(e), t.eatWhile(g.digit), "." == t.peek() && (t.eat("."), t.eatWhile(g.digit)), t.eat(g.exponent) && (t.eat(g.sign), t.eatWhile(g.digit)), !0) : !1)
            }
            var n = "builtin",
                r = "comment",
                i = "string",
                s = "tag",
                o = "atom",
                u = "number",
                a = "bracket",
                f = "keyword",
                l = 2,
                c = 1,
                p = h("true false nil"),
                d = h("defn defn- def def- defonce defmulti defmethod defmacro defstruct deftype defprotocol defrecord defproject deftest slice defalias defhinted defmacro- defn-memo defnk defnk defonce- defunbound defunbound- defvar defvar- let letfn do case cond condp for loop recur when when-not when-let when-first if if-let if-not . .. -> ->> doto and or dosync doseq dotimes dorun doall load import unimport ns in-ns refer try catch finally throw with-open with-local-vars binding gen-class gen-and-load-class gen-and-save-class handler-case handle"),
                v = h("* *1 *2 *3 *agent* *allow-unresolved-vars* *assert *clojure-version* *command-line-args* *compile-files* *compile-path* *e *err* *file* *flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* *print-dup* *print-length* *print-level* *print-meta* *print-readably* *read-eval* *source-path* *use-context-classloader* *warn-on-reflection* + - / < <= = == > >= accessor aclone agent agent-errors aget alength alias all-ns alter alter-meta! alter-var-root amap ancestors and apply areduce array-map aset aset-boolean aset-byte aset-char aset-double aset-float aset-int aset-long aset-short assert assoc assoc! assoc-in associative? atom await await-for await1 bases bean bigdec bigint binding bit-and bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left bit-shift-right bit-test bit-xor boolean boolean-array booleans bound-fn bound-fn* butlast byte byte-array bytes case cast char char-array char-escape-string char-name-string char? chars chunk chunk-append chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? class class? clear-agent-errors clojure-version coll? comment commute comp comparator compare compare-and-set! compile complement concat cond condp conj conj! cons constantly construct-proxy contains? count counted? create-ns create-struct cycle dec decimal? declare definline defmacro defmethod defmulti defn defn- defonce defstruct delay delay? deliver deref derive descendants destructure disj disj! dissoc dissoc! distinct distinct? doall doc dorun doseq dosync dotimes doto double double-array doubles drop drop-last drop-while empty empty? ensure enumeration-seq eval even? every? extend extend-protocol extend-type extends? extenders false? ffirst file-seq filter find find-doc find-ns find-var first float float-array float? floats flush fn fn? fnext for force format future future-call future-cancel future-cancelled? future-done? future? gen-class gen-interface gensym get get-in get-method get-proxy-class get-thread-bindings get-validator hash hash-map hash-set identical? identity if-let if-not ifn? import in-ns inc init-proxy instance? int int-array integer? interleave intern interpose into into-array ints io! isa? iterate iterator-seq juxt key keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list list* list? load load-file load-reader load-string loaded-libs locking long long-array longs loop macroexpand macroexpand-1 make-array make-hierarchy map map? mapcat max max-key memfn memoize merge merge-with meta method-sig methods min min-key mod name namespace neg? newline next nfirst nil? nnext not not-any? not-empty not-every? not= ns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? or parents partial partition pcalls peek persistent! pmap pop pop! pop-thread-bindings pos? pr pr-str prefer-method prefers primitives-classnames print print-ctor print-doc print-dup print-method print-namespace-doc print-simple print-special-doc print-str printf println println-str prn prn-str promise proxy proxy-call-with-super proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot rand rand-int range ratio? rational? rationalize re-find re-groups re-matcher re-matches re-pattern re-seq read read-line read-string reify reduce ref ref-history-count ref-max-history ref-min-history ref-set refer refer-clojure release-pending-sends rem remove remove-method remove-ns repeat repeatedly replace replicate require reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq rsubseq satisfies? second select-keys send send-off seq seq? seque sequence sequential? set set-validator! set? short short-array shorts shutdown-agents slurp some sort sort-by sorted-map sorted-map-by sorted-set sorted-set-by sorted? special-form-anchor special-symbol? split-at split-with str stream? string? struct struct-map subs subseq subvec supers swap! symbol symbol? sync syntax-symbol-anchor take take-last take-nth take-while test the-ns time to-array to-array-2d trampoline transient tree-seq true? type unchecked-add unchecked-dec unchecked-divide unchecked-inc unchecked-multiply unchecked-negate unchecked-remainder unchecked-subtract underive unquote unquote-splicing update-in update-proxy use val vals var-get var-set var? vary-meta vec vector vector? when when-first when-let when-not while with-bindings with-bindings* with-in-str with-loading-context with-local-vars with-meta with-open with-out-str with-precision xml-seq"),
                m = h("ns fn def defn defmethod bound-fn if if-not case condp when while when-not when-first do future comment doto locking proxy with-open with-precision reify deftype defrecord defprotocol extend extend-protocol extend-type try catch let letfn binding loop for doseq dotimes when-let if-let defstruct struct-map assoc testing deftest handler-case handle dotrace deftrace"),
                g = {
                    digit: /\d/,
                    digit_or_colon: /[\d:]/,
                    hex: /[0-9a-f]/i,
                    sign: /[+-]/,
                    exponent: /e/i,
                    keyword_char: /[^\s\(\[\;\)\]]/,
                    basic: /[\w\$_\-]/,
                    lang_keyword: /[\w*+!\-_?:\/]/
                };
            return {
                startState: function() {
                    return {
                        indentStack: null,
                        indentation: 0,
                        mode: !1
                    }
                },
                token: function(e, t) {
                    t.indentStack == null && e.sol() && (t.indentation = e.indentation());
                    if (e.eatSpace()) return null;
                    var s = null;
                    switch (t.mode) {
                        case "string":
                            var c, h = !1;
                            while ((c = e.next()) != null) {
                                if (c == '"' && !h) {
                                    t.mode = !1;
                                    break
                                }
                                h = !h && c == "\\"
                            }
                            s = i;
                            break;
                        default:
                            var y = e.next();
                            if (y == '"') t.mode = "string",
                                s = i;
                            else if (y == "'" && !g.digit_or_colon.test(e.peek())) s = o;
                            else if (y == ";") e.skipToEnd(),
                                s = r;
                            else if (E(y, e)) s = u;
                            else if (y == "(" || y == "[") {
                                var S = "",
                                    x = e.column(),
                                    T;
                                if (y == "(") while ((T = e.eat(g.keyword_char)) != null) S += T;
                                S.length > 0 && (m.propertyIsEnumerable(S) || /^(?:def|with)/.test(S)) ? b(t, x + l, y) : (e.eatSpace(), e.eol() || e.peek() == ";" ? b(t, x + 1, y) : b(t, x + e.current().length, y)),
                                    e.backUp(e.current().length - 1),
                                    s = a
                            } else if (y == ")" || y == "]") s = a,
                                t.indentStack != null && t.indentStack.type == (y == ")" ? "(": "[") && w(t);
                            else {
                                if (y == ":") return e.eatWhile(g.lang_keyword),
                                    o;
                                e.eatWhile(g.basic),
                                    d && d.propertyIsEnumerable(e.current()) ? s = f: v && v.propertyIsEnumerable(e.current()) ? s = n: p && p.propertyIsEnumerable(e.current()) ? s = o: s = null
                            }
                    }
                    return s
                },
                indent: function(e, t) {
                    return e.indentStack == null ? e.indentation: e.indentStack.indent
                }
            }
        }),
    CodeMirror.defineMIME("text/x-clojure", "clojure"),
    CodeMirror.defineMode("coffeescript",
        function(e) {
            function n(e) {
                return new RegExp("^((" + e.join(")|(") + "))\\b")
            }
            function y(e, n) {
                if (e.sol()) {
                    var c = n.scopes[0].offset;
                    if (e.eatSpace()) {
                        var h = e.indentation();
                        return h > c ? "indent": h < c ? "dedent": null
                    }
                    c > 0 && S(e, n)
                }
                if (e.eatSpace()) return null;
                var m = e.peek();
                if (e.match("####")) return e.skipToEnd(),
                    "comment";
                if (e.match("###")) return n.tokenize = w,
                    n.tokenize(e, n);
                if (m === "#") return e.skipToEnd(),
                    "comment";
                if (e.match(/^-?[0-9\.]/, !1)) {
                    var y = !1;
                    e.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i) && (y = !0),
                        e.match(/^-?\d+\.\d*/) && (y = !0),
                        e.match(/^-?\.\d+/) && (y = !0);
                    if (y) return e.peek() == "." && e.backUp(1),
                        "number";
                    var E = !1;
                    e.match(/^-?0x[0-9a-f]+/i) && (E = !0),
                        e.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/) && (E = !0),
                        e.match(/^-?0(?![\dx])/i) && (E = !0);
                    if (E) return "number"
                }
                if (e.match(d)) return n.tokenize = b(e.current(), "string"),
                    n.tokenize(e, n);
                if (e.match(v)) {
                    if (e.current() != "/" || e.match(/^.*\//, !1)) return n.tokenize = b(e.current(), "string-2"),
                        n.tokenize(e, n);
                    e.backUp(1)
                }
                return e.match(u) || e.match(o) ? "punctuation": e.match(s) || e.match(r) || e.match(l) ? "operator": e.match(i) ? "punctuation": e.match(g) ? "atom": e.match(p) ? "keyword": e.match(a) ? "variable": e.match(f) ? "property": (e.next(), t)
            }
            function b(n, r) {
                var i = n.length == 1;
                return function(o, u) {
                    while (!o.eol()) {
                        o.eatWhile(/[^'"\/\\]/);
                        if (o.eat("\\")) {
                            o.next();
                            if (i && o.eol()) return r
                        } else {
                            if (o.match(n)) return u.tokenize = y,
                                r;
                            o.eat(/['"\/]/)
                        }
                    }
                    return i && (e.mode.singleLineStringErrors ? r = t: u.tokenize = y),
                        r
                }
            }
            function w(e, t) {
                while (!e.eol()) {
                    e.eatWhile(/[^#]/);
                    if (e.match("###")) {
                        t.tokenize = y;
                        break
                    }
                    e.eatWhile("#")
                }
                return "comment"
            }
            function E(t, n, r) {
                r = r || "coffee";
                var i = 0;
                if (r === "coffee") {
                    for (var s = 0; s < n.scopes.length; s++) if (n.scopes[s].type === "coffee") {
                        i = n.scopes[s].offset + e.indentUnit;
                        break
                    }
                } else i = t.column() + t.current().length;
                n.scopes.unshift({
                    offset: i,
                    type: r
                })
            }
            function S(e, t) {
                if (t.scopes.length == 1) return;
                if (t.scopes[0].type === "coffee") {
                    var n = e.indentation(),
                        r = -1;
                    for (var i = 0; i < t.scopes.length; ++i) if (n === t.scopes[i].offset) {
                        r = i;
                        break
                    }
                    if (r === -1) return ! 0;
                    while (t.scopes[0].offset !== n) t.scopes.shift();
                    return ! 1
                }
                return t.scopes.shift(),
                    !1
            }
            function x(e, n) {
                var r = n.tokenize(e, n),
                    i = e.current();
                if (i === ".") return r = n.tokenize(e, n),
                    i = e.current(),
                    r === "variable" ? "variable": t;
                i === "return" && (n.dedent += 1),
                    ((i === "->" || i === "=>") && !n.lambda && n.scopes[0].type == "coffee" && e.peek() === "" || r === "indent") && E(e, n);
                var s = "[({".indexOf(i);
                return s !== -1 && E(e, n, "])}".slice(s, s + 1)),
                    c.exec(i) && E(e, n),
                    i == "then" && S(e, n),
                    r === "dedent" && S(e, n) ? t: (s = "])}".indexOf(i), s !== -1 && S(e, n) ? t: (n.dedent > 0 && e.eol() && n.scopes[0].type == "coffee" && (n.scopes.length > 1 && n.scopes.shift(), n.dedent -= 1), r))
            }
            var t = "error",
                r = new RegExp("^[\\+\\-\\*/%&|\\^~<>!?]"),
                i = new RegExp("^[\\(\\)\\[\\]\\{\\},:`=;\\.]"),
                s = new RegExp("^((->)|(=>)|(\\+\\+)|(\\+\\=)|(\\-\\-)|(\\-\\=)|(\\*\\*)|(\\*\\=)|(\\/\\/)|(\\/\\=)|(==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//))"),
                o = new RegExp("^((\\.\\.)|(\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"),
                u = new RegExp("^((\\.\\.\\.)|(//=)|(>>=)|(<<=)|(\\*\\*=))"),
                a = new RegExp("^[_A-Za-z$][_A-Za-z$0-9]*"),
                f = new RegExp("^(@|this.)[_A-Za-z$][_A-Za-z$0-9]*"),
                l = n(["and", "or", "not", "is", "isnt", "in", "instanceof", "typeof"]),
                c = ["for", "while", "loop", "if", "unless", "else", "switch", "try", "catch", "finally", "class"],
                h = ["break", "by", "continue", "debugger", "delete", "do", "in", "of", "new", "return", "then", "this", "throw", "when", "until"],
                p = n(c.concat(h));
            c = n(c);
            var d = new RegExp("^('{3}|\"{3}|['\"])"),
                v = new RegExp("^(/{3}|/)"),
                m = ["Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no"],
                g = n(m),
                T = {
                    startState: function(e) {
                        return {
                            tokenize: y,
                            scopes: [{
                                offset: e || 0,
                                type: "coffee"
                            }],
                            lastToken: null,
                            lambda: !1,
                            dedent: 0
                        }
                    },
                    token: function(e, t) {
                        var n = x(e, t);
                        return t.lastToken = {
                            style: n,
                            content: e.current()
                        },
                            e.eol() && e.lambda && (t.lambda = !1),
                            n
                    },
                    indent: function(e, t) {
                        return e.tokenize != y ? 0 : e.scopes[0].offset
                    }
                };
            return T
        }),
    CodeMirror.defineMIME("text/x-coffeescript", "coffeescript"),
    CodeMirror.defineMode("css",
        function(e) {
            function a(e) {
                var t = {};
                for (var n = 0; n < e.length; ++n) t[e[n]] = !0;
                return t
            }
            function f(e, t) {
                return n = t,
                    e
            }
            function l(e, t) {
                var r = e.next();
                if (r == "@") return e.eatWhile(/[\w\\\-]/),
                    f("def", e.current());
                if (r == "/" && e.eat("*")) return t.tokenize = c,
                    c(e, t);
                if (r == "<" && e.eat("!")) return t.tokenize = h,
                    h(e, t);
                if (r == "=") f(null, "compare");
                else {
                    if (! (r != "~" && r != "|" || !e.eat("="))) return f(null, "compare");
                    if (r == '"' || r == "'") return t.tokenize = p(r),
                        t.tokenize(e, t);
                    if (r == "#") return e.eatWhile(/[\w\\\-]/),
                        f("atom", "hash");
                    if (r == "!") return e.match(/^\s*\w*/),
                        f("keyword", "important");
                    if (/\d/.test(r)) return e.eatWhile(/[\w.%]/),
                        f("number", "unit");
                    if (r !== "-") return /[,+>*\/]/.test(r) ? f(null, "select-op") : r == "." && e.match(/^\w+/) ? f("qualifier", n) : r == ":" ? f("operator", r) : /[;{}\[\]\(\)]/.test(r) ? f(null, r) : (e.eatWhile(/[\w\\\-]/), f("property", "variable"));
                    if (/\d/.test(e.peek())) return e.eatWhile(/[\w.%]/),
                        f("number", "unit");
                    if (e.match(/^[^-]+-/)) return f("meta", n)
                }
            }
            function c(e, t) {
                var n = !1,
                    r;
                while ((r = e.next()) != null) {
                    if (n && r == "/") {
                        t.tokenize = l;
                        break
                    }
                    n = r == "*"
                }
                return f("comment", "comment")
            }
            function h(e, t) {
                var n = 0,
                    r;
                while ((r = e.next()) != null) {
                    if (n >= 2 && r == ">") {
                        t.tokenize = l;
                        break
                    }
                    n = r == "-" ? n + 1 : 0
                }
                return f("comment", "comment")
            }
            function p(e) {
                return function(t, n) {
                    var r = !1,
                        i;
                    while ((i = t.next()) != null) {
                        if (i == e && !r) break;
                        r = !r && i == "\\"
                    }
                    return r || (n.tokenize = l),
                        f("string", "string")
                }
            }
            var t = e.indentUnit,
                n, r = a(["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"]),
                i = a(["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid"]),
                s = a(["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid-cell", "grid-column", "grid-column-align", "grid-column-sizing", "grid-column-span", "grid-columns", "grid-flow", "grid-row", "grid-row-align", "grid-row-sizing", "grid-row-span", "grid-rows", "grid-template", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-shadow", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"]),
                o = a(["black", "silver", "gray", "white", "maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"]),
                u = a(["above", "absolute", "activeborder", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "auto", "avoid", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break-all", "break-word", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ew-resize", "expanded", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "kannada", "katakana", "katakana-iroha", "khmer", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "navy", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "overlay", "overline", "padding", "padding-box", "painted", "paused", "persian", "plus-darker", "plus-lighter", "pointer", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radio", "read-only", "read-write", "read-write-plaintext-only", "relative", "repeat", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "single", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "white", "wider", "window", "windowframe", "windowtext", "x-large", "x-small", "xor", "xx-large", "xx-small", "yellow"]);
            return {
                startState: function(e) {
                    return {
                        tokenize: l,
                        baseIndent: e || 0,
                        stack: []
                    }
                },
                token: function(e, t) {
                    if (e.eatSpace()) return null;
                    var a = t.tokenize(e, t),
                        f = t.stack[t.stack.length - 1];
                    return a == "property" ? f == "propertyValue" ? u[e.current()] ? a = "string-2": o[e.current()] ? a = "keyword": a = "variable-2": f == "rule" ? s[e.current()] || (a += " error") : !f || f == "@media{" ? a = "tag": f == "@media" ? r[e.current()] ? a = "attribute": /^(only|not)$/i.test(e.current()) ? a = "keyword": e.current().toLowerCase() == "and" ? a = "error": i[e.current()] ? a = "error": a = "attribute error": f == "@mediaType" ? r[e.current()] ? a = "attribute": e.current().toLowerCase() == "and" ? a = "operator": /^(only|not)$/i.test(e.current()) ? a = "error": i[e.current()] ? a = "error": a = "error": f == "@mediaType(" ? s[e.current()] || (r[e.current()] ? a = "error": e.current().toLowerCase() == "and" ? a = "operator": /^(only|not)$/i.test(e.current()) ? a = "error": a += " error") : a = "error": a == "atom" ? !f || f == "@media{" ? a = "builtin": f == "propertyValue" ? /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e.current()) || (a += " error") : a = "error": f == "@media" && n == "{" && (a = "error"),
                        n == "{" ? f == "@media" || f == "@mediaType" ? (t.stack.pop(), t.stack[t.stack.length - 1] = "@media{") : t.stack.push("rule") : n == "}" ? (t.stack.pop(), f == "propertyValue" && t.stack.pop()) : n == "@media" ? t.stack.push("@media") : f == "@media" && /\b(keyword|attribute)\b/.test(a) ? t.stack.push("@mediaType") : f == "@mediaType" && e.current() == "," ? t.stack.pop() : f == "@mediaType" && n == "(" ? t.stack.push("@mediaType(") : f == "@mediaType(" && n == ")" ? t.stack.pop() : f == "rule" && n == ":" ? t.stack.push("propertyValue") : f == "propertyValue" && n == ";" && t.stack.pop(),
                        a
                },
                indent: function(e, n) {
                    var r = e.stack.length;
                    return /^\}/.test(n) && (r -= e.stack[e.stack.length - 1] == "propertyValue" ? 2 : 1),
                        e.baseIndent + r * t
                },
                electricChars: "}"
            }
        }),
    CodeMirror.defineMIME("text/css", "css"),
    CodeMirror.defineMode("diff",
        function() {
            var e = {
                "+": "tag",
                "-": "string",
                "@": "meta"
            };
            return {
                token: function(t) {
                    var n = t.string.search(/[\t ]+?$/);
                    if (!t.sol() || n === 0) return t.skipToEnd(),
                        ("error " + (e[t.string.charAt(0)] || "")).replace(/ $/, "");
                    var r = e[t.peek()] || t.skipToEnd();
                    return n === -1 ? t.skipToEnd() : t.pos = n,
                        r
                }
            }
        }),
    CodeMirror.defineMIME("text/x-diff", "diff"),
    CodeMirror.defineMIME("text/x-erlang", "erlang"),
    CodeMirror.defineMode("erlang",
        function(e, t) {
            function n(e, t, n) {
                n == "record" ? e.context = "record": e.context = !1,
                    n != "whitespace" && n != "comment" && (e.lastToken = t.current());
                switch (n) {
                    case "atom":
                        return "atom";
                    case "attribute":
                        return "attribute";
                    case "builtin":
                        return "builtin";
                    case "comment":
                        return "comment";
                    case "fun":
                        return "meta";
                    case "function":
                        return "tag";
                    case "guard":
                        return "property";
                    case "keyword":
                        return "keyword";
                    case "macro":
                        return "variable-2";
                    case "number":
                        return "number";
                    case "operator":
                        return "operator";
                    case "record":
                        return "bracket";
                    case "string":
                        return "string";
                    case "type":
                        return "def";
                    case "variable":
                        return "variable";
                    case "error":
                        return "error";
                    case "separator":
                        return null;
                    case "open_paren":
                        return null;
                    case "close_paren":
                        return null;
                    default:
                        return null
                }
            }
            function S(e, t) {
                return - 1 < t.indexOf(e)
            }
            function x(e, t) {
                var n = e.start,
                    r = t.length;
                if (r <= n) {
                    var i = e.string.slice(n - r, n);
                    return i == t
                }
                return ! 1
            }
            function T(e, t) {
                if (e.eatSpace()) return n(t, e, "whitespace");
                if ((P(t).token == "" || P(t).token == ".") && e.peek() == "-") {
                    e.next();
                    if (e.eat(p) && e.eatWhile(g)) return S(e.current(), r) ? n(t, e, "type") : n(t, e, "attribute");
                    e.backUp(1)
                }
                var h = e.next();
                if (h == "%") return e.skipToEnd(),
                    n(t, e, "comment");
                if (h == "?") return e.eatWhile(g),
                    n(t, e, "macro");
                if (h == "#") return e.eatWhile(g),
                    n(t, e, "record");
                if (h == "$") return e.next() == "\\" && (e.eatWhile(m) || e.next()),
                    n(t, e, "string");
                if (h == "'") return L(e) ? n(t, e, "atom") : n(t, e, "error");
                if (h == '"') return k(e) ? n(t, e, "string") : n(t, e, "error");
                if (d.test(h)) return e.eatWhile(g),
                    n(t, e, "variable");
                if (p.test(h)) {
                    e.eatWhile(g);
                    if (e.peek() == "/") return e.next(),
                        e.eatWhile(v) ? n(t, e, "fun") : (e.backUp(1), n(t, e, "atom"));
                    var T = e.current();
                    return S(T, i) ? (H(t, e), n(t, e, "keyword")) : e.peek() == "(" ? S(T, c) && (!x(e, ":") || x(e, "erlang:")) ? n(t, e, "builtin") : n(t, e, "function") : S(T, l) ? n(t, e, "guard") : S(T, o) ? n(t, e, "operator") : e.peek() == ":" ? T == "erlang" ? n(t, e, "builtin") : n(t, e, "function") : n(t, e, "atom")
                }
                return v.test(h) ? (e.eatWhile(v), e.eat("#") ? e.eatWhile(v) : (e.eat(".") && e.eatWhile(v), e.eat(/[eE]/) && (e.eat(/[-+]/), e.eatWhile(v))), n(t, e, "number")) : N(e, b, a) ? (H(t, e), n(t, e, "open_paren")) : N(e, w, f) ? (H(t, e), n(t, e, "close_paren")) : C(e, E, s) ? (t.context == 0 && H(t, e), n(t, e, "separator")) : C(e, y, u) ? n(t, e, "operator") : n(t, e, null)
            }
            function N(e, t, n) {
                if (e.current().length == 1 && t.test(e.current())) {
                    e.backUp(1);
                    while (t.test(e.peek())) {
                        e.next();
                        if (S(e.current(), n)) return ! 0
                    }
                    e.backUp(e.current().length - 1)
                }
                return ! 1
            }
            function C(e, t, n) {
                if (e.current().length == 1 && t.test(e.current())) {
                    while (t.test(e.peek())) e.next();
                    while (0 < e.current().length) {
                        if (S(e.current(), n)) return ! 0;
                        e.backUp(1)
                    }
                    e.next()
                }
                return ! 1
            }
            function k(e) {
                return A(e, '"', "\\")
            }
            function L(e) {
                return A(e, "'", "\\")
            }
            function A(e, t, n) {
                while (!e.eol()) {
                    var r = e.next();
                    if (r == t) return ! 0;
                    r == n && e.next()
                }
                return ! 1
            }
            function O(e) {
                this.token = e ? e.current() : "",
                    this.column = e ? e.column() : 0,
                    this.indent = e ? e.indentation() : 0
            }
            function M(t, n) {
                var r = e.indentUnit,
                    i = ["after", "catch"],
                    s = P(t).token,
                    o = _(n, /[^a-z]/);
                return S(s, a) ? P(t).column + s.length: s == "." || s == "" ? 0 : s == "->" ? o == "end" ? P(t, 2).column: P(t, 2).token == "fun" ? P(t, 2).column + r: P(t).indent + r: S(o, i) ? P(t).indent: P(t).column + r
            }
            function _(e, t) {
                var n = e.match(t);
                return n ? e.slice(0, n.index) : e
            }
            function D(e) {
                return e.tokenStack.pop()
            }
            function P(e, t) {
                var n = e.tokenStack.length,
                    r = t ? t: 1;
                return n < r ? new O: e.tokenStack[n - r]
            }
            function H(e, t) {
                var n = t.current(),
                    r = P(e).token;
                return S(n, h) ? !1 : j(r, n) ? (D(e), !1) : B(r, n) ? (D(e), H(e, t)) : (e.tokenStack.push(new O(t)), !0)
            }
            function B(e, t) {
                switch (e + " " + t) {
                    case "when ->":
                        return ! 0;
                    case "-> end":
                        return ! 0;
                    case "-> .":
                        return ! 0;
                    case ". .":
                        return ! 0;
                    default:
                        return ! 1
                }
            }
            function j(e, t) {
                switch (e + " " + t) {
                    case "( )":
                        return ! 0;
                    case "[ ]":
                        return ! 0;
                    case "{ }":
                        return ! 0;
                    case "<< >>":
                        return ! 0;
                    case "begin end":
                        return ! 0;
                    case "case end":
                        return ! 0;
                    case "fun end":
                        return ! 0;
                    case "if end":
                        return ! 0;
                    case "receive end":
                        return ! 0;
                    case "try end":
                        return ! 0;
                    case "-> ;":
                        return ! 0;
                    default:
                        return ! 1
                }
            }
            var r = ["-type", "-spec", "-export_type", "-opaque"],
                i = ["after", "begin", "catch", "case", "cond", "end", "fun", "if", "let", "of", "query", "receive", "try", "when"],
                s = ["->", ";", ":", ".", ","],
                o = ["and", "andalso", "band", "bnot", "bor", "bsl", "bsr", "bxor", "div", "not", "or", "orelse", "rem", "xor"],
                u = ["+", "-", "*", "/", ">", ">=", "<", "=<", "=:=", "==", "=/=", "/=", "||", "<-"],
                a = ["<<", "(", "[", "{"],
                f = ["}", "]", ")", ">>"],
                l = ["is_atom", "is_binary", "is_bitstring", "is_boolean", "is_float", "is_function", "is_integer", "is_list", "is_number", "is_pid", "is_port", "is_record", "is_reference", "is_tuple", "atom", "binary", "bitstring", "boolean", "function", "integer", "list", "number", "pid", "port", "record", "reference", "tuple"],
                c = ["abs", "adler32", "adler32_combine", "alive", "apply", "atom_to_binary", "atom_to_list", "binary_to_atom", "binary_to_existing_atom", "binary_to_list", "binary_to_term", "bit_size", "bitstring_to_list", "byte_size", "check_process_code", "contact_binary", "crc32", "crc32_combine", "date", "decode_packet", "delete_module", "disconnect_node", "element", "erase", "exit", "float", "float_to_list", "garbage_collect", "get", "get_keys", "group_leader", "halt", "hd", "integer_to_list", "internal_bif", "iolist_size", "iolist_to_binary", "is_alive", "is_atom", "is_binary", "is_bitstring", "is_boolean", "is_float", "is_function", "is_integer", "is_list", "is_number", "is_pid", "is_port", "is_process_alive", "is_record", "is_reference", "is_tuple", "length", "link", "list_to_atom", "list_to_binary", "list_to_bitstring", "list_to_existing_atom", "list_to_float", "list_to_integer", "list_to_pid", "list_to_tuple", "load_module", "make_ref", "module_loaded", "monitor_node", "node", "node_link", "node_unlink", "nodes", "notalive", "now", "open_port", "pid_to_list", "port_close", "port_command", "port_connect", "port_control", "pre_loaded", "process_flag", "process_info", "processes", "purge_module", "put", "register", "registered", "round", "self", "setelement", "size", "spawn", "spawn_link", "spawn_monitor", "spawn_opt", "split_binary", "statistics", "term_to_binary", "time", "throw", "tl", "trunc", "tuple_size", "tuple_to_list", "unlink", "unregister", "whereis"],
                h = [",", ":", "catch", "after", "of", "cond", "let", "query"],
                p = /[a-z_]/,
                d = /[A-Z_]/,
                v = /[0-9]/,
                m = /[0-7]/,
                g = /[a-z_A-Z0-9]/,
                y = /[\+\-\*\/<>=\|:]/,
                b = /[<\(\[\{]/,
                w = /[>\)\]\}]/,
                E = /[\->\.,:;]/;
            return {
                startState: function() {
                    return {
                        tokenStack: [],
                        context: !1,
                        lastToken: null
                    }
                },
                token: function(e, t) {
                    return T(e, t)
                },
                indent: function(e, t) {
                    return M(e, t)
                }
            }
        }),
    CodeMirror.defineMode("go",
        function(e, t) {
            function a(e, t) {
                var n = e.next();
                if (n == '"' || n == "'" || n == "`") return t.tokenize = f(n),
                    t.tokenize(e, t);
                if (/[\d\.]/.test(n)) return n == "." ? e.match(/^[0-9]+([eE][\-+]?[0-9]+)?/) : n == "0" ? e.match(/^[xX][0-9a-fA-F]+/) || e.match(/^0[0-7]+/) : e.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/),
                    "number";
                if (/[\[\]{}\(\),;\:\.]/.test(n)) return u = n,
                    null;
                if (n == "/") {
                    if (e.eat("*")) return t.tokenize = l,
                        l(e, t);
                    if (e.eat("/")) return e.skipToEnd(),
                        "comment"
                }
                if (o.test(n)) return e.eatWhile(o),
                    "operator";
                e.eatWhile(/[\w\$_]/);
                var s = e.current();
                if (r.propertyIsEnumerable(s)) {
                    if (s == "case" || s == "default") u = "case";
                    return "keyword"
                }
                return i.propertyIsEnumerable(s) ? "atom": "variable"
            }
            function f(e) {
                return function(t, n) {
                    var r = !1,
                        i, s = !1;
                    while ((i = t.next()) != null) {
                        if (i == e && !r) {
                            s = !0;
                            break
                        }
                        r = !r && i == "\\"
                    }
                    if (s || !r && e != "`") n.tokenize = a;
                    return "string"
                }
            }
            function l(e, t) {
                var n = !1,
                    r;
                while (r = e.next()) {
                    if (r == "/" && n) {
                        t.tokenize = a;
                        break
                    }
                    n = r == "*"
                }
                return "comment"
            }
            function c(e, t, n, r, i) {
                this.indented = e,
                    this.column = t,
                    this.type = n,
                    this.align = r,
                    this.prev = i
            }
            function h(e, t, n) {
                return e.context = new c(e.indented, t, n, null, e.context)
            }
            function p(e) {
                var t = e.context.type;
                if (t == ")" || t == "]" || t == "}") e.indented = e.context.indented;
                return e.context = e.context.prev
            }
            var n = e.indentUnit,
                r = {
                    "break": !0,
                    "case": !0,
                    chan: !0,
                    "const": !0,
                    "continue": !0,
                    "default": !0,
                    defer: !0,
                    "else": !0,
                    fallthrough: !0,
                    "for": !0,
                    func: !0,
                    go: !0,
                    "goto": !0,
                    "if": !0,
                    "import": !0,
                    "interface": !0,
                    map: !0,
                    "package": !0,
                    range: !0,
                    "return": !0,
                    select: !0,
                    struct: !0,
                    "switch": !0,
                    type: !0,
                    "var": !0,
                    bool: !0,
                    "byte": !0,
                    complex64: !0,
                    complex128: !0,
                    float32: !0,
                    float64: !0,
                    int8: !0,
                    int16: !0,
                    int32: !0,
                    int64: !0,
                    string: !0,
                    uint8: !0,
                    uint16: !0,
                    uint32: !0,
                    uint64: !0,
                    "int": !0,
                    uint: !0,
                    uintptr: !0
                },
                i = {
                    "true": !0,
                    "false": !0,
                    iota: !0,
                    nil: !0,
                    append: !0,
                    cap: !0,
                    close: !0,
                    complex: !0,
                    copy: !0,
                    imag: !0,
                    len: !0,
                    make: !0,
                    "new": !0,
                    panic: !0,
                    print: !0,
                    println: !0,
                    real: !0,
                    recover: !0
                },
                s = {
                    "else": !0,
                    "for": !0,
                    func: !0,
                    "if": !0,
                    "interface": !0,
                    select: !0,
                    struct: !0,
                    "switch": !0
                },
                o = /[+\-*&^%:=<>!|\/]/,
                u;
            return {
                startState: function(e) {
                    return {
                        tokenize: null,
                        context: new c((e || 0) - n, 0, "top", !1),
                        indented: 0,
                        startOfLine: !0
                    }
                },
                token: function(e, t) {
                    var n = t.context;
                    e.sol() && (n.align == null && (n.align = !1), t.indented = e.indentation(), t.startOfLine = !0, n.type == "case" && (n.type = "}"));
                    if (e.eatSpace()) return null;
                    u = null;
                    var r = (t.tokenize || a)(e, t);
                    return r == "comment" ? r: (n.align == null && (n.align = !0), u == "{" ? h(t, e.column(), "}") : u == "[" ? h(t, e.column(), "]") : u == "(" ? h(t, e.column(), ")") : u == "case" ? n.type = "case": u == "}" && n.type == "}" ? n = p(t) : u == n.type && p(t), t.startOfLine = !1, r)
                },
                indent: function(e, t) {
                    if (e.tokenize != a && e.tokenize != null) return 0;
                    var r = e.context,
                        i = t && t.charAt(0);
                    if (r.type == "case" && /^(?:case|default)\b/.test(t)) return e.context.type = "}",
                        r.indented;
                    var s = i == r.type;
                    return r.align ? r.column + (s ? 0 : 1) : r.indented + (s ? 0 : n)
                },
                electricChars: "{}:"
            }
        }),
    CodeMirror.defineMIME("text/x-go", "go"),
    CodeMirror.defineMode("htmlembedded",
        function(e, t) {
            function o(e, t) {
                return e.match(n, !1) ? (t.token = u, i.token(e, t.scriptState)) : s.token(e, t.htmlState)
            }
            function u(e, t) {
                return e.match(r, !1) ? (t.token = o, s.token(e, t.htmlState)) : i.token(e, t.scriptState)
            }
            var n = t.scriptStartRegex || /^<%/i,
                r = t.scriptEndRegex || /^%>/i,
                i, s;
            return {
                startState: function() {
                    return i = i || CodeMirror.getMode(e, t.scriptingModeSpec),
                        s = s || CodeMirror.getMode(e, "htmlmixed"),
                    {
                        token: t.startOpen ? u: o,
                        htmlState: s.startState(),
                        scriptState: i.startState()
                    }
                },
                token: function(e, t) {
                    return t.token(e, t)
                },
                indent: function(e, t) {
                    return e.token == o ? s.indent(e.htmlState, t) : i.indent(e.scriptState, t)
                },
                copyState: function(e) {
                    return {
                        token: e.token,
                        htmlState: CodeMirror.copyState(s, e.htmlState),
                        scriptState: CodeMirror.copyState(i, e.scriptState)
                    }
                },
                electricChars: "/{}:",
                innerMode: function(e) {
                    return e.token == u ? {
                        state: e.scriptState,
                        mode: i
                    }: {
                        state: e.htmlState,
                        mode: s
                    }
                }
            }
        },
        "htmlmixed"),
    CodeMirror.defineMIME("application/x-ejs", {
        name: "htmlembedded",
        scriptingModeSpec: "javascript"
    }),
    CodeMirror.defineMIME("application/x-aspx", {
        name: "htmlembedded",
        scriptingModeSpec: "text/x-csharp"
    }),
    CodeMirror.defineMIME("application/x-jsp", {
        name: "htmlembedded",
        scriptingModeSpec: "text/x-java"
    }),
    CodeMirror.defineMIME("application/x-erb", {
        name: "htmlembedded",
        scriptingModeSpec: "ruby"
    }),
    CodeMirror.defineMode("htmlmixed",
        function(e) {
            function i(e, i) {
                var s = t.token(e, i.htmlState);
                return s == "tag" && e.current() == ">" && i.htmlState.context && (/^script$/i.test(i.htmlState.context.tagName) ? (i.token = o, i.localState = n.startState(t.indent(i.htmlState, ""))) : /^style$/i.test(i.htmlState.context.tagName) && (i.token = u, i.localState = r.startState(t.indent(i.htmlState, "")))),
                    s
            }
            function s(e, t, n) {
                var r = e.current(),
                    i = r.search(t),
                    s;
                if (i > -1) e.backUp(r.length - i);
                else if (s = r.match(/<\/?$/)) e.backUp(r[0].length),
                    e.match(t, !1) || e.match(r[0]);
                return n
            }
            function o(e, t) {
                return e.match(/^<\/\s*script\s*>/i, !1) ? (t.token = i, t.localState = null, i(e, t)) : s(e, /<\/\s*script\s*>/, n.token(e, t.localState))
            }
            function u(e, t) {
                return e.match(/^<\/\s*style\s*>/i, !1) ? (t.token = i, t.localState = null, i(e, t)) : s(e, /<\/\s*style\s*>/, r.token(e, t.localState))
            }
            var t = CodeMirror.getMode(e, {
                    name: "xml",
                    htmlMode: !0
                }),
                n = CodeMirror.getMode(e, "javascript"),
                r = CodeMirror.getMode(e, "css");
            return {
                startState: function() {
                    var e = t.startState();
                    return {
                        token: i,
                        localState: null,
                        mode: "html",
                        htmlState: e
                    }
                },
                copyState: function(e) {
                    if (e.localState) var i = CodeMirror.copyState(e.token == u ? r: n, e.localState);
                    return {
                        token: e.token,
                        localState: i,
                        mode: e.mode,
                        htmlState: CodeMirror.copyState(t, e.htmlState)
                    }
                },
                token: function(e, t) {
                    return t.token(e, t)
                },
                indent: function(e, s) {
                    return e.token == i || /^\s*<\//.test(s) ? t.indent(e.htmlState, s) : e.token == o ? n.indent(e.localState, s) : r.indent(e.localState, s)
                },
                electricChars: "/{}:",
                innerMode: function(e) {
                    var s = e.token == i ? t: e.token == o ? n: r;
                    return {
                        state: e.localState || e.htmlState,
                        mode: s
                    }
                }
            }
        },
        "xml", "javascript", "css"),
    CodeMirror.defineMIME("text/html", "htmlmixed"),
    CodeMirror.defineMode("javascript",
        function(e, t) {
            function o(e, t, n) {
                return t.tokenize = n,
                    n(e, t)
            }
            function u(e, t) {
                var n = !1,
                    r;
                while ((r = e.next()) != null) {
                    if (r == t && !n) return ! 1;
                    n = !n && r == "\\"
                }
                return n
            }
            function l(e, t, n) {
                return a = e,
                    f = n,
                    t
            }
            function c(e, t) {
                var n = e.next();
                if (n == '"' || n == "'") return o(e, t, h(n));
                if (/[\[\]{}\(\),;\:\.]/.test(n)) return l(n);
                if (n == "0" && e.eat(/x/i)) return e.eatWhile(/[\da-f]/i),
                    l("number", "number");
                if (/\d/.test(n) || n == "-" && e.eat(/\d/)) return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),
                    l("number", "number");
                if (n == "/") return e.eat("*") ? o(e, t, p) : e.eat("/") ? (e.skipToEnd(), l("comment", "comment")) : t.reAllowed ? (u(e, "/"), e.eatWhile(/[gimy]/), l("regexp", "string-2")) : (e.eatWhile(s), l("operator", null, e.current()));
                if (n == "#") return e.skipToEnd(),
                    l("error", "error");
                if (s.test(n)) return e.eatWhile(s),
                    l("operator", null, e.current());
                e.eatWhile(/[\w\$_]/);
                var r = e.current(),
                    a = i.propertyIsEnumerable(r) && i[r];
                return a && t.kwAllowed ? l(a.type, a.style, r) : l("variable", "variable", r)
            }
            function h(e) {
                return function(t, n) {
                    return u(t, e) || (n.tokenize = c),
                        l("string", "string")
                }
            }
            function p(e, t) {
                var n = !1,
                    r;
                while (r = e.next()) {
                    if (r == "/" && n) {
                        t.tokenize = c;
                        break
                    }
                    n = r == "*"
                }
                return l("comment", "comment")
            }
            function v(e, t, n, r, i, s) {
                this.indented = e,
                    this.column = t,
                    this.type = n,
                    this.prev = i,
                    this.info = s,
                    r != null && (this.align = r)
            }
            function m(e, t) {
                for (var n = e.localVars; n; n = n.next) if (n.name == t) return ! 0
            }
            function g(e, t, n, i, s) {
                var o = e.cc;
                y.state = e,
                    y.stream = s,
                    y.marked = null,
                    y.cc = o,
                    e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);
                for (;;) {
                    var u = o.length ? o.pop() : r ? A: L;
                    if (u(n, i)) {
                        while (o.length && o[o.length - 1].lex) o.pop()();
                        return y.marked ? y.marked: n == "variable" && m(e, i) ? "variable-2": t
                    }
                }
            }
            function b() {
                for (var e = arguments.length - 1; e >= 0; e--) y.cc.push(arguments[e])
            }
            function w() {
                return b.apply(null, arguments),
                    !0
            }
            function E(e) {
                var t = y.state;
                if (t.context) {
                    y.marked = "def";
                    for (var n = t.localVars; n; n = n.next) if (n.name == e) return;
                    t.localVars = {
                        name: e,
                        next: t.localVars
                    }
                }
            }
            function x() {
                y.state.context = {
                    prev: y.state.context,
                    vars: y.state.localVars
                },
                    y.state.localVars = S
            }
            function T() {
                y.state.localVars = y.state.context.vars,
                    y.state.context = y.state.context.prev
            }
            function N(e, t) {
                var n = function() {
                    var n = y.state;
                    n.lexical = new v(n.indented, y.stream.column(), e, null, n.lexical, t)
                };
                return n.lex = !0,
                    n
            }
            function C() {
                var e = y.state;
                e.lexical.prev && (e.lexical.type == ")" && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
            }
            function k(e) {
                return function(n) {
                    return n == e ? w() : e == ";" ? b() : w(arguments.callee)
                }
            }
            function L(e) {
                return e == "var" ? w(N("vardef"), j, k(";"), C) : e == "keyword a" ? w(N("form"), A, L, C) : e == "keyword b" ? w(N("form"), L, C) : e == "{" ? w(N("}"), B, C) : e == ";" ? w() : e == "function" ? w(z) : e == "for" ? w(N("form"), k("("), N(")"), I, k(")"), C, L, C) : e == "variable" ? w(N("stat"), _) : e == "switch" ? w(N("form"), A, N("}", "switch"), k("{"), B, C, C) : e == "case" ? w(A, k(":")) : e == "default" ? w(k(":")) : e == "catch" ? w(N("form"), x, k("("), W, k(")"), L, C, T) : b(N("stat"), A, k(";"), C)
            }
            function A(e) {
                return d.hasOwnProperty(e) ? w(M) : e == "function" ? w(z) : e == "keyword c" ? w(O) : e == "(" ? w(N(")"), O, k(")"), C, M) : e == "operator" ? w(A) : e == "[" ? w(N("]"), H(A, "]"), C, M) : e == "{" ? w(N("}"), H(P, "}"), C, M) : w()
            }
            function O(e) {
                return e.match(/[;\}\)\],]/) ? b() : b(A)
            }
            function M(e, t) {
                if (e == "operator" && /\+\+|--/.test(t)) return w(M);
                if (e == "operator" && t == "?") return w(A, k(":"), A);
                if (e == ";") return;
                if (e == "(") return w(N(")"), H(A, ")"), C, M);
                if (e == ".") return w(D, M);
                if (e == "[") return w(N("]"), A, k("]"), C, M)
            }
            function _(e) {
                return e == ":" ? w(C, L) : b(M, k(";"), C)
            }
            function D(e) {
                if (e == "variable") return y.marked = "property",
                    w()
            }
            function P(e) {
                e == "variable" && (y.marked = "property");
                if (d.hasOwnProperty(e)) return w(k(":"), A)
            }
            function H(e, t) {
                function n(r) {
                    return r == "," ? w(e, n) : r == t ? w() : w(k(t))
                }
                return function(i) {
                    return i == t ? w() : b(e, n)
                }
            }
            function B(e) {
                return e == "}" ? w() : b(L, B)
            }
            function j(e, t) {
                return e == "variable" ? (E(t), w(F)) : w()
            }
            function F(e, t) {
                if (t == "=") return w(A, F);
                if (e == ",") return w(j)
            }
            function I(e) {
                return e == "var" ? w(j, k(";"), R) : e == ";" ? w(R) : e == "variable" ? w(q) : w(R)
            }
            function q(e, t) {
                return t == "in" ? w(A) : w(M, R)
            }
            function R(e, t) {
                return e == ";" ? w(U) : t == "in" ? w(A) : w(A, k(";"), U)
            }
            function U(e) {
                e != ")" && w(A)
            }
            function z(e, t) {
                if (e == "variable") return E(t),
                    w(z);
                if (e == "(") return w(N(")"), x, H(W, ")"), C, L, T)
            }
            function W(e, t) {
                if (e == "variable") return E(t),
                    w()
            }
            var n = e.indentUnit,
                r = t.json,
                i = function() {
                    function e(e) {
                        return {
                            type: e,
                            style: "keyword"
                        }
                    }
                    var t = e("keyword a"),
                        n = e("keyword b"),
                        r = e("keyword c"),
                        i = e("operator"),
                        s = {
                            type: "atom",
                            style: "atom"
                        };
                    return {
                        "if": t,
                        "while": t,
                        "with": t,
                        "else": n,
                        "do": n,
                        "try": n,
                        "finally": n,
                        "return": r,
                        "break": r,
                        "continue": r,
                        "new": r,
                        "delete": r,
                        "throw": r,
                        "var": e("var"),
                        "const": e("var"),
                        let: e("var"),
                        "function": e("function"),
                        "catch": e("catch"),
                        "for": e("for"),
                        "switch": e("switch"),
                        "case": e("case"),
                        "default": e("default"),
                        "in": i,
                        "typeof": i,
                        "instanceof": i,
                        "true": s,
                        "false": s,
                        "null": s,
                        "undefined": s,
                        NaN: s,
                        Infinity: s
                    }
                } (),
                s = /[+\-*&%=<>!?|]/,
                a,
                f,
                d = {
                    atom: !0,
                    number: !0,
                    variable: !0,
                    string: !0,
                    regexp: !0
                },
                y = {
                    state: null,
                    column: null,
                    marked: null,
                    cc: null
                },
                S = {
                    name: "this",
                    next: {
                        name: "arguments"
                    }
                };
            return C.lex = !0,
            {
                startState: function(e) {
                    return {
                        tokenize: c,
                        reAllowed: !0,
                        kwAllowed: !0,
                        cc: [],
                        lexical: new v((e || 0) - n, 0, "block", !1),
                        localVars: t.localVars,
                        context: t.localVars && {
                            vars: t.localVars
                        },
                        indented: 0
                    }
                },
                token: function(e, t) {
                    e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation());
                    if (e.eatSpace()) return null;
                    var n = t.tokenize(e, t);
                    return a == "comment" ? n: (t.reAllowed = a == "operator" || a == "keyword c" || !!a.match(/^[\[{}\(,;:]$/), t.kwAllowed = a != ".", g(t, n, a, f, e))
                },
                indent: function(e, t) {
                    if (e.tokenize == p) return CodeMirror.Pass;
                    if (e.tokenize != c) return 0;
                    var r = t && t.charAt(0),
                        i = e.lexical;
                    i.type == "stat" && r == "}" && (i = i.prev);
                    var s = i.type,
                        o = r == s;
                    return s == "vardef" ? i.indented + 4 : s == "form" && r == "{" ? i.indented: s == "stat" || s == "form" ? i.indented + n: i.info == "switch" && !o ? i.indented + (/^(?:case|default)\b/.test(t) ? n: 2 * n) : i.align ? i.column + (o ? 0 : 1) : i.indented + (o ? 0 : n)
                },
                electricChars: ":{}"
            }
        }),
    CodeMirror.defineMIME("text/javascript", "javascript"),
    CodeMirror.defineMIME("application/json", {
        name: "javascript",
        json: !0
    }),
    CodeMirror.defineMode("less",
        function(e) {
            function r(e, t) {
                return n = t,
                    e
            }
            function s(e) {
                for (var t = 0; t < i.length; t++) if (e === i[t]) return ! 0
            }
            function u(e, t) {
                var i = e.next();
                if (i == "@") return e.eatWhile(/[\w\-]/),
                    r("meta", e.current());
                if (i == "/" && e.eat("*")) return t.tokenize = f,
                    f(e, t);
                if (i == "<" && e.eat("!")) return t.tokenize = l,
                    l(e, t);
                if (i == "=") r(null, "compare");
                else {
                    if (i == "|" && e.eat("=")) return r(null, "compare");
                    if (i == '"' || i == "'") return t.tokenize = c(i),
                        t.tokenize(e, t);
                    if (i == "/") {
                        if (e.eat("/")) return t.tokenize = a,
                            a(e, t);
                        if (n == "string" || n == "(") return r("string", "string");
                        if (t.stack[t.stack.length - 1] != undefined) return r(null, i);
                        e.eatWhile(/[\a-zA-Z0-9\-_.\s]/);
                        if (/\/|\)|#/.test(e.peek() || e.eatSpace() && e.peek() == ")") || e.eol()) return r("string", "string")
                    } else {
                        if (i == "!") return e.match(/^\s*\w*/),
                            r("keyword", "important");
                        if (/\d/.test(i)) return e.eatWhile(/[\w.%]/),
                            r("number", "unit");
                        if (/[,+<>*\/]/.test(i)) return e.peek() == "=" || n == "a" ? r("string", "string") : r(null, "select-op");
                        if (!/[;{}:\[\]()~\|]/.test(i)) {
                            if (i == ".") return n == "(" || n == "string" ? r("string", "string") : (e.eatWhile(/[\a-zA-Z0-9\-_]/), e.peek() == " " && e.eatSpace(), e.peek() == ")" ? r("number", "unit") : r("tag", "tag"));
                            if (i == "#") return e.eatWhile(/[A-Za-z0-9]/),
                                e.current().length == 4 || e.current().length == 7 ? e.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/, false) != null ? e.current().substring(1) != e.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/, false) ? r("atom", "tag") : (e.eatSpace(), /[\/<>.(){!$%^&*_\-\\?=+\|#'~`]/.test(e.peek()) ? r("atom", "tag") : e.peek() == "}" ? r("number", "unit") : /[a-zA-Z\\]/.test(e.peek()) ? r("atom", "tag") : e.eol() ? r("atom", "tag") : r("number", "unit")) : (e.eatWhile(/[\w\\\-]/), r("atom", "tag")) : (e.eatWhile(/[\w\\\-]/), r("atom", "tag"));
                            if (i == "&") return e.eatWhile(/[\w\-]/),
                                r(null, i);
                            e.eatWhile(/[\w\\\-_%.{]/);
                            if (n == "string") return r("string", "string");
                            if (e.current().match(/(^http$|^https$)/) != null) return e.eatWhile(/[\w\\\-_%.{:\/]/),
                                r("string", "string");
                            if (e.peek() == "<" || e.peek() == ">") return r("tag", "tag");
                            if (/\(/.test(e.peek())) return r(null, i);
                            if (e.peek() == "/" && t.stack[t.stack.length - 1] != undefined) return r("string", "string");
                            if (e.current().match(/\-\d|\-.\d/)) return r("number", "unit");
                            if (s(e.current().toLowerCase())) return r("tag", "tag");
                            if (/\/|[\s\)]/.test(e.peek() || e.eol() || e.eatSpace() && e.peek() == "/") && e.current().indexOf(".") !== -1) return e.current().substring(e.current().length - 1, e.current().length) == "{" ? (e.backUp(1), r("tag", "tag")) : (e.eatSpace(), /[{<>.a-zA-Z\/]/.test(e.peek()) || e.eol() ? r("tag", "tag") : r("string", "string"));
                            if (e.eol() || e.peek() == "[" || e.peek() == "#" || n == "tag") return e.current().substring(e.current().length - 1, e.current().length) == "{" && e.backUp(1),
                                r("tag", "tag");
                            if (n == "compare" || n == "a" || n == "(") return r("string", "string");
                            if (n == "|" || e.current() == "-" || n == "[") return r(null, i);
                            if (e.peek() == ":") {
                                e.next();
                                var u = e.peek() == ":" ? !0 : !1;
                                if (!u) {
                                    var h = e.pos,
                                        p = e.current().length;
                                    e.eatWhile(/[a-z\\\-]/);
                                    var d = e.pos;
                                    if (e.current().substring(p - 1).match(o) != null) return e.backUp(d - (h - 1)),
                                        r("tag", "tag");
                                    e.backUp(d - (h - 1))
                                } else e.backUp(1);
                                return u ? r("tag", "tag") : r("variable", "variable")
                            }
                            return r("variable", "variable")
                        }
                        if (i == ":") return e.eatWhile(/[a-z\\\-]/),
                            o.test(e.current()) ? r("tag", "tag") : e.peek() == ":" ? (e.next(), e.eatWhile(/[a-z\\\-]/), e.current().match(/\:\:\-(o|ms|moz|webkit)\-/) ? r("string", "string") : o.test(e.current().substring(1)) ? r("tag", "tag") : r(null, i)) : r(null, i);
                        if (i != "~") return r(null, i);
                        if (n == "r") return r("string", "string")
                    }
                }
            }
            function a(e, t) {
                return e.skipToEnd(),
                    t.tokenize = u,
                    r("comment", "comment")
            }
            function f(e, t) {
                var n = !1,
                    i;
                while ((i = e.next()) != null) {
                    if (n && i == "/") {
                        t.tokenize = u;
                        break
                    }
                    n = i == "*"
                }
                return r("comment", "comment")
            }
            function l(e, t) {
                var n = 0,
                    i;
                while ((i = e.next()) != null) {
                    if (n >= 2 && i == ">") {
                        t.tokenize = u;
                        break
                    }
                    n = i == "-" ? n + 1 : 0
                }
                return r("comment", "comment")
            }
            function c(e) {
                return function(t, n) {
                    var i = !1,
                        s;
                    while ((s = t.next()) != null) {
                        if (s == e && !i) break;
                        i = !i && s == "\\"
                    }
                    return i || (n.tokenize = u),
                        r("string", "string")
                }
            }
            var t = e.indentUnit,
                n, i = "a abbr acronym address applet area article aside audio b base basefont bdi bdo big blockquote body br button canvas caption cite code col colgroup command datalist dd del details dfn dir div dl dt em embed fieldset figcaption figure font footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins keygen kbd label legend li link map mark menu meta meter nav noframes noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td textarea tfoot th thead time title tr track tt u ul var video wbr".split(" "),
                o = /(^\:root$|^\:nth\-child$|^\:nth\-last\-child$|^\:nth\-of\-type$|^\:nth\-last\-of\-type$|^\:first\-child$|^\:last\-child$|^\:first\-of\-type$|^\:last\-of\-type$|^\:only\-child$|^\:only\-of\-type$|^\:empty$|^\:link|^\:visited$|^\:active$|^\:hover$|^\:focus$|^\:target$|^\:lang$|^\:enabled^\:disabled$|^\:checked$|^\:first\-line$|^\:first\-letter$|^\:before$|^\:after$|^\:not$|^\:required$|^\:invalid$)/;
            return {
                startState: function(e) {
                    return {
                        tokenize: u,
                        baseIndent: e || 0,
                        stack: []
                    }
                },
                token: function(e, t) {
                    if (e.eatSpace()) return null;
                    var r = t.tokenize(e, t),
                        i = t.stack[t.stack.length - 1];
                    if (n == "hash" && i == "rule") r = "atom";
                    else if (r == "variable") if (i == "rule") r = null;
                    else if (!i || i == "@media{") r = e.current() == "when" ? "variable": /[\s,|\s\)|\s]/.test(e.peek()) ? "tag": n;
                    return i == "rule" && /^[\{\};]$/.test(n) && t.stack.pop(),
                        n == "{" ? i == "@media" ? t.stack[t.stack.length - 1] = "@media{": t.stack.push("{") : n == "}" ? t.stack.pop() : n == "@media" ? t.stack.push("@media") : i == "{" && n != "comment" && t.stack.push("rule"),
                        r
                },
                indent: function(e, n) {
                    var r = e.stack.length;
                    return /^\}/.test(n) && (r -= e.stack[e.stack.length - 1] == "rule" ? 2 : 1),
                        e.baseIndent + r * t
                },
                electricChars: "}"
            }
        }),
    CodeMirror.defineMIME("text/x-less", "less"),
    CodeMirror.mimeModes.hasOwnProperty("text/css") || CodeMirror.defineMIME("text/css", "less"),
    CodeMirror.defineMode("lua",
        function(e, t) {
            function r(e) {
                return new RegExp("^(?:" + e.join("|") + ")", "i")
            }
            function i(e) {
                return new RegExp("^(?:" + e.join("|") + ")$", "i")
            }
            function c(e) {
                var t = 0;
                while (e.eat("="))++t;
                return e.eat("["),
                    t
            }
            function h(e, t) {
                var n = e.next();
                return n == "-" && e.eat("-") ? e.eat("[") ? (t.cur = p(c(e), "comment"))(e, t) : (e.skipToEnd(), "comment") : n == '"' || n == "'" ? (t.cur = d(n))(e, t) : n == "[" && /[\[=]/.test(e.peek()) ? (t.cur = p(c(e), "string"))(e, t) : /\d/.test(n) ? (e.eatWhile(/[\w.%]/), "number") : /[\w_]/.test(n) ? (e.eatWhile(/[\w\\\-_.]/), "variable") : null
            }
            function p(e, t) {
                return function(n, r) {
                    var i = null,
                        s;
                    while ((s = n.next()) != null) if (i == null) s == "]" && (i = 0);
                    else if (s == "=")++i;
                    else {
                        if (s == "]" && i == e) {
                            r.cur = h;
                            break
                        }
                        i = null
                    }
                    return t
                }
            }
            function d(e) {
                return function(t, n) {
                    var r = !1,
                        i;
                    while ((i = t.next()) != null) {
                        if (i == e && !r) break;
                        r = !r && i == "\\"
                    }
                    return r || (n.cur = h),
                        "string"
                }
            }
            var n = e.indentUnit,
                s = i(t.specials || []),
                o = i(["_G", "_VERSION", "assert", "collectgarbage", "dofile", "error", "getfenv", "getmetatable", "ipairs", "load", "loadfile", "loadstring", "module", "next", "pairs", "pcall", "print", "rawequal", "rawget", "rawset", "require", "select", "setfenv", "setmetatable", "tonumber", "tostring", "type", "unpack", "xpcall", "coroutine.create", "coroutine.resume", "coroutine.running", "coroutine.status", "coroutine.wrap", "coroutine.yield", "debug.debug", "debug.getfenv", "debug.gethook", "debug.getinfo", "debug.getlocal", "debug.getmetatable", "debug.getregistry", "debug.getupvalue", "debug.setfenv", "debug.sethook", "debug.setlocal", "debug.setmetatable", "debug.setupvalue", "debug.traceback", "close", "flush", "lines", "read", "seek", "setvbuf", "write", "io.close", "io.flush", "io.input", "io.lines", "io.open", "io.output", "io.popen", "io.read", "io.stderr", "io.stdin", "io.stdout", "io.tmpfile", "io.type", "io.write", "math.abs", "math.acos", "math.asin", "math.atan", "math.atan2", "math.ceil", "math.cos", "math.cosh", "math.deg", "math.exp", "math.floor", "math.fmod", "math.frexp", "math.huge", "math.ldexp", "math.log", "math.log10", "math.max", "math.min", "math.modf", "math.pi", "math.pow", "math.rad", "math.random", "math.randomseed", "math.sin", "math.sinh", "math.sqrt", "math.tan", "math.tanh", "os.clock", "os.date", "os.difftime", "os.execute", "os.exit", "os.getenv", "os.remove", "os.rename", "os.setlocale", "os.time", "os.tmpname", "package.cpath", "package.loaded", "package.loaders", "package.loadlib", "package.path", "package.preload", "package.seeall", "string.byte", "string.char", "string.dump", "string.find", "string.format", "string.gmatch", "string.gsub", "string.len", "string.lower", "string.match", "string.rep", "string.reverse", "string.sub", "string.upper", "table.concat", "table.insert", "table.maxn", "table.remove", "table.sort"]),
                u = i(["and", "break", "elseif", "false", "nil", "not", "or", "return", "true", "function", "end", "if", "then", "else", "do", "while", "repeat", "until", "for", "in", "local"]),
                a = i(["function", "if", "repeat", "do", "\\(", "{"]),
                f = i(["end", "until", "\\)", "}"]),
                l = r(["end", "until", "\\)", "}", "else", "elseif"]);
            return {
                startState: function(e) {
                    return {
                        basecol: e || 0,
                        indentDepth: 0,
                        cur: h
                    }
                },
                token: function(e, t) {
                    if (e.eatSpace()) return null;
                    var n = t.cur(e, t),
                        r = e.current();
                    return n == "variable" && (u.test(r) ? n = "keyword": o.test(r) ? n = "builtin": s.test(r) && (n = "variable-2")),
                        n != "comment" && n != "string" && (a.test(r) ? ++t.indentDepth: f.test(r) && --t.indentDepth),
                        n
                },
                indent: function(e, t) {
                    var r = l.test(t);
                    return e.basecol + n * (e.indentDepth - (r ? 1 : 0))
                }
            }
        }),
    CodeMirror.defineMIME("text/x-lua", "lua"),
    CodeMirror.defineMode("markdown",
        function(e, t) {
            function T(e, t, n) {
                return t.f = t.inline = n,
                    n(e, t)
            }
            function N(e, t, n) {
                return t.f = t.block = n,
                    n(e, t)
            }
            function C(e) {
                return e.linkTitle = !1,
                    e.code = !1,
                    e.em = !1,
                    e.strong = !1,
                    e.quote = !1,
                    !n && e.f == L && (e.f = M, e.block = k),
                    null
            }
            function k(e, t) {
                var n;
                t.list !== !1 && t.indentationDiff >= 0 ? (t.indentationDiff < 4 && (t.indentation -= t.indentationDiff), t.list = null) : t.list = !1;
                if (t.indentationDiff >= 4) return t.indentation -= 4,
                    e.skipToEnd(),
                    a;
                if (e.eatSpace()) return null;
                if (e.peek() === "#" || s && e.match(S)) t.header = !0;
                else if (e.eat(">")) t.indentation++,
                    t.quote = !0;
                else {
                    if (e.peek() === "[") return T(e, t, P);
                    if (e.match(b, !0)) return c;
                    if (n = e.match(w, !0) || e.match(E, !0)) t.indentation += 4,
                        t.list = !0
                }
                return T(e, t, t.inline)
            }
            function L(e, t) {
                var i = r.token(e, t.htmlState);
                return n && i === "tag" && t.htmlState.type !== "openTag" && !t.htmlState.context && (t.f = M, t.block = k),
                    t.md_inside && e.current().indexOf(">") != -1 && (t.f = M, t.block = k, t.htmlState.context = undefined),
                    i
            }
            function A(e) {
                var t = [];
                return e.strong ? t.push(e.em ? y: g) : e.em && t.push(m),
                    e.code && t.push(a),
                    e.header && t.push(u),
                    e.quote && t.push(f),
                    e.list !== !1 && t.push(l),
                    t.length ? t.join(" ") : null
            }
            function O(e, t) {
                return e.match(x, !0) ? A(t) : undefined
            }
            function M(e, t) {
                var n = t.text(e, t);
                if (typeof n != "undefined") return n;
                if (t.list) return t.list = null,
                    l;
                var r = e.next();
                if (r === "\\") return e.next(),
                    A(t);
                if (t.linkTitle) {
                    t.linkTitle = !1;
                    var s = r;
                    r === "(" && (s = ")"),
                        s = (s + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                    var o = "^\\s*(?:[^" + s + "\\\\]+|\\\\\\\\|\\\\.)" + s;
                    if (e.match(new RegExp(o), !0)) return v
                }
                if (r === "`") {
                    var u = A(t),
                        a = e.pos;
                    e.eatWhile("`");
                    var f = 1 + e.pos - a;
                    return t.code ? f === i ? (t.code = !1, u) : A(t) : (i = f, t.code = !0, A(t))
                }
                if (t.code) return A(t);
                if (r === "[" && e.match(/.*\] ?(?:\(|\[)/, !1)) return T(e, t, _);
                if (r === "<" && e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !0)) return T(e, t, j(h, ">"));
                if (r === "<" && e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !0)) return T(e, t, j(p, ">"));
                if (r === "<" && e.match(/^\w/, !1)) {
                    var c = !1;
                    if (e.string.indexOf(">") != -1) {
                        var d = e.string.substring(1, e.string.indexOf(">"));
                        /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(d) && (t.md_inside = !0)
                    }
                    return e.backUp(1),
                        N(e, t, L)
                }
                if (r === "<" && e.match(/^\/\w*?>/)) return t.md_inside = !1,
                    "tag";
                var u = A(t);
                if (r === "*" || r === "_") {
                    if (t.strong === r && e.eat(r)) return t.strong = !1,
                        u;
                    if (!t.strong && e.eat(r)) return t.strong = r,
                        A(t);
                    if (t.em === r) return t.em = !1,
                        u;
                    if (!t.em) return t.em = r,
                        A(t)
                } else if (r === " ") if (e.eat("*") || e.eat("_")) {
                    if (e.peek() === " ") return A(t);
                    e.backUp(1)
                }
                return A(t)
            }
            function _(e, t) {
                while (!e.eol()) {
                    var n = e.next();
                    n === "\\" && e.next();
                    if (n === "]") return t.inline = t.f = D,
                        d
                }
                return d
            }
            function D(e, t) {
                if (e.eatSpace()) return null;
                var n = e.next();
                return n === "(" || n === "[" ? T(e, t, j(v, n === "(" ? ")": "]")) : "error"
            }
            function P(e, t) {
                return e.match(/^[^\]]*\]:/, !0) ? (t.f = H, d) : T(e, t, M)
            }
            function H(e, t) {
                return e.eatSpace() ? null: (e.match(/^[^\s]+/, !0), e.peek() === undefined ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = M, v)
            }
            function B(e) {
                return B[e] || (e = (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), B[e] = new RegExp("^(?:[^\\\\]+?|\\\\.)*?(" + e + ")")),
                    B[e]
            }
            function j(e, t, n) {
                return n = n || M,
                    function(r, i) {
                        return r.match(B(t)),
                            i.inline = i.f = n,
                            e
                    }
            }
            var n = CodeMirror.mimeModes.hasOwnProperty("text/html"),
                r = CodeMirror.getMode(e, n ? "text/html": "text/plain"),
                i = 0,
                s = !1,
                o = !1,
                u = "header",
                a = "comment",
                f = "quote",
                l = "string",
                c = "hr",
                h = "link",
                p = "link",
                d = "link",
                v = "string",
                m = "em",
                g = "strong",
                y = "emstrong",
                b = /^([*\-=_])(?:\s*\1){2,}\s*$/,
                w = /^[*\-+]\s+/,
                E = /^[0-9]+\.\s+/,
                S = /^(?:\={1,}|-{1,})$/,
                x = /^[^\[*_\\<>` "'(]+/;
            return {
                startState: function() {
                    return {
                        f: k,
                        block: k,
                        htmlState: CodeMirror.startState(r),
                        indentation: 0,
                        inline: M,
                        text: O,
                        linkTitle: !1,
                        em: !1,
                        strong: !1,
                        header: !1,
                        list: !1,
                        quote: !1
                    }
                },
                copyState: function(e) {
                    return {
                        f: e.f,
                        block: e.block,
                        htmlState: CodeMirror.copyState(r, e.htmlState),
                        indentation: e.indentation,
                        inline: e.inline,
                        text: e.text,
                        linkTitle: e.linkTitle,
                        em: e.em,
                        strong: e.strong,
                        header: e.header,
                        list: e.list,
                        quote: e.quote,
                        md_inside: e.md_inside
                    }
                },
                token: function(e, t) {
                    if (e.sol()) {
                        if (e.match(/^\s*$/, !0)) return s = !1,
                            C(t);
                        o && (s = !0, o = !1),
                            o = !0,
                            t.header = !1,
                            t.f = t.block;
                        var n = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;
                        t.indentationDiff = n - t.indentation,
                            t.indentation = n;
                        if (n > 0) return null
                    }
                    return t.f(e, t)
                },
                blankLine: C,
                getType: A
            }
        },
        "xml"),
    CodeMirror.defineMIME("text/x-markdown", "markdown"),
    CodeMirror.defineMode("mysql",
        function(e) {
            function r(e) {
                return new RegExp("^(?:" + e.join("|") + ")$", "i")
            }
            function u(e, t) {
                var r = e.next();
                n = null;
                if (r == "$" || r == "?") return e.match(/^[\w\d]*/),
                    "variable-2";
                if (r == "<" && !e.match(/^[\s\u00a0=]/, !1)) return e.match(/^[^\s\u00a0>]*>?/),
                    "atom";
                if (r == '"' || r == "'") return t.tokenize = a(r),
                    t.tokenize(e, t);
                if (r == "`") return t.tokenize = f(r),
                    t.tokenize(e, t);
                if (/[{}\(\),\.;\[\]]/.test(r)) return n = r,
                    null;
                if (r != "-") {
                    if (o.test(r)) return e.eatWhile(o),
                        null;
                    if (r == ":") return e.eatWhile(/[\w\d\._\-]/),
                        "atom";
                    e.eatWhile(/[_\w\d]/);
                    if (e.eat(":")) return e.eatWhile(/[\w\d_\-]/),
                        "atom";
                    var l = e.current(),
                        c;
                    return i.test(l) ? null: s.test(l) ? "keyword": "variable"
                }
                var u = e.next();
                if (u == "-") return e.skipToEnd(),
                    "comment"
            }
            function a(e) {
                return function(t, n) {
                    var r = !1,
                        i;
                    while ((i = t.next()) != null) {
                        if (i == e && !r) {
                            n.tokenize = u;
                            break
                        }
                        r = !r && i == "\\"
                    }
                    return "string"
                }
            }
            function f(e) {
                return function(t, n) {
                    var r = !1,
                        i;
                    while ((i = t.next()) != null) {
                        if (i == e && !r) {
                            n.tokenize = u;
                            break
                        }
                        r = !r && i == "\\"
                    }
                    return "variable-2"
                }
            }
            function l(e, t, n) {
                e.context = {
                    prev: e.context,
                    indent: e.indent,
                    col: n,
                    type: t
                }
            }
            function c(e) {
                e.indent = e.context.indent,
                    e.context = e.context.prev
            }
            var t = e.indentUnit,
                n, i = r(["str", "lang", "langmatches", "datatype", "bound", "sameterm", "isiri", "isuri", "isblank", "isliteral", "union", "a"]),
                s = r(["ACCESSIBLE", "ALTER", "AS", "BEFORE", "BINARY", "BY", "CASE", "CHARACTER", "COLUMN", "CONTINUE", "CROSS", "CURRENT_TIMESTAMP", "DATABASE", "DAY_MICROSECOND", "DEC", "DEFAULT", "DESC", "DISTINCT", "DOUBLE", "EACH", "ENCLOSED", "EXIT", "FETCH", "FLOAT8", "FOREIGN", "GRANT", "HIGH_PRIORITY", "HOUR_SECOND", "IN", "INNER", "INSERT", "INT2", "INT8", "INTO", "JOIN", "KILL", "LEFT", "LINEAR", "LOCALTIME", "LONG", "LOOP", "MATCH", "MEDIUMTEXT", "MINUTE_SECOND", "NATURAL", "NULL", "OPTIMIZE", "OR", "OUTER", "PRIMARY", "RANGE", "READ_WRITE", "REGEXP", "REPEAT", "RESTRICT", "RIGHT", "SCHEMAS", "SENSITIVE", "SHOW", "SPECIFIC", "SQLSTATE", "SQL_CALC_FOUND_ROWS", "STARTING", "TERMINATED", "TINYINT", "TRAILING", "UNDO", "UNLOCK", "USAGE", "UTC_DATE", "VALUES", "VARCHARACTER", "WHERE", "WRITE", "ZEROFILL", "ALL", "AND", "ASENSITIVE", "BIGINT", "BOTH", "CASCADE", "CHAR", "COLLATE", "CONSTRAINT", "CREATE", "CURRENT_TIME", "CURSOR", "DAY_HOUR", "DAY_SECOND", "DECLARE", "DELETE", "DETERMINISTIC", "DIV", "DUAL", "ELSEIF", "EXISTS", "FALSE", "FLOAT4", "FORCE", "FULLTEXT", "HAVING", "HOUR_MINUTE", "IGNORE", "INFILE", "INSENSITIVE", "INT1", "INT4", "INTERVAL", "ITERATE", "KEYS", "LEAVE", "LIMIT", "LOAD", "LOCK", "LONGTEXT", "MASTER_SSL_VERIFY_SERVER_CERT", "MEDIUMINT", "MINUTE_MICROSECOND", "MODIFIES", "NO_WRITE_TO_BINLOG", "ON", "OPTIONALLY", "OUT", "PRECISION", "PURGE", "READS", "REFERENCES", "RENAME", "REQUIRE", "REVOKE", "SCHEMA", "SELECT", "SET", "SPATIAL", "SQLEXCEPTION", "SQL_BIG_RESULT", "SSL", "TABLE", "TINYBLOB", "TO", "TRUE", "UNIQUE", "UPDATE", "USING", "UTC_TIMESTAMP", "VARCHAR", "WHEN", "WITH", "YEAR_MONTH", "ADD", "ANALYZE", "ASC", "BETWEEN", "BLOB", "CALL", "CHANGE", "CHECK", "CONDITION", "CONVERT", "CURRENT_DATE", "CURRENT_USER", "DATABASES", "DAY_MINUTE", "DECIMAL", "DELAYED", "DESCRIBE", "DISTINCTROW", "DROP", "ELSE", "ESCAPED", "EXPLAIN", "FLOAT", "FOR", "FROM", "GROUP", "HOUR_MICROSECOND", "IF", "INDEX", "INOUT", "INT", "INT3", "INTEGER", "IS", "KEY", "LEADING", "LIKE", "LINES", "LOCALTIMESTAMP", "LONGBLOB", "LOW_PRIORITY", "MEDIUMBLOB", "MIDDLEINT", "MOD", "NOT", "NUMERIC", "OPTION", "ORDER", "OUTFILE", "PROCEDURE", "READ", "REAL", "RELEASE", "REPLACE", "RETURN", "RLIKE", "SECOND_MICROSECOND", "SEPARATOR", "SMALLINT", "SQL", "SQLWARNING", "SQL_SMALL_RESULT", "STRAIGHT_JOIN", "THEN", "TINYTEXT", "TRIGGER", "UNION", "UNSIGNED", "USE", "UTC_TIME", "VARBINARY", "VARYING", "WHILE", "XOR", "FULL", "COLUMNS", "MIN", "MAX", "STDEV", "COUNT"]),
                o = /[*+\-<>=&|]/;
            return {
                startState: function(e) {
                    return {
                        tokenize: u,
                        context: null,
                        indent: 0,
                        col: 0
                    }
                },
                token: function(e, t) {
                    e.sol() && (t.context && t.context.align == null && (t.context.align = !1), t.indent = e.indentation());
                    if (e.eatSpace()) return null;
                    var r = t.tokenize(e, t);
                    r != "comment" && t.context && t.context.align == null && t.context.type != "pattern" && (t.context.align = !0);
                    if (n == "(") l(t, ")", e.column());
                    else if (n == "[") l(t, "]", e.column());
                    else if (n == "{") l(t, "}", e.column());
                    else if (/[\]\}\)]/.test(n)) {
                        while (t.context && t.context.type == "pattern") c(t);
                        t.context && n == t.context.type && c(t)
                    } else n == "." && t.context && t.context.type == "pattern" ? c(t) : /atom|string|variable/.test(r) && t.context && (/[\}\]]/.test(t.context.type) ? l(t, "pattern", e.column()) : t.context.type == "pattern" && !t.context.align && (t.context.align = !0, t.context.col = e.column()));
                    return r
                },
                indent: function(e, n) {
                    var r = n && n.charAt(0),
                        i = e.context;
                    if (/[\]\}]/.test(r)) while (i && i.type == "pattern") i = i.prev;
                    var s = i && r == i.type;
                    return i ? i.type == "pattern" ? i.col: i.align ? i.col + (s ? 0 : 1) : i.indent + (s ? 0 : t) : 0
                }
            }
        }),
    CodeMirror.defineMIME("text/x-mysql", "mysql"),
    CodeMirror.defineMode("perl",
        function(e, t) {
            function s(e, t, n, r, i) {
                return t.chain = null,
                    t.style = null,
                    t.tail = null,
                    t.tokenize = function(e, t) {
                        var s = !1,
                            o, a = 0;
                        while (o = e.next()) {
                            if (o === n[a] && !s) return n[++a] !== undefined ? (t.chain = n[a], t.style = r, t.tail = i) : i && e.eatWhile(i),
                                t.tokenize = u,
                                r;
                            s = !s && o == "\\"
                        }
                        return r
                    },
                    t.tokenize(e, t)
            }
            function o(e, t, n) {
                return t.tokenize = function(e, t) {
                    return e.string == n && (t.tokenize = u),
                        e.skipToEnd(),
                        "string"
                },
                    t.tokenize(e, t)
            }
            function u(e, t) {
                if (e.eatSpace()) return null;
                if (t.chain) return s(e, t, t.chain, t.style, t.tail);
                if (e.match(/^\-?[\d\.]/, !1) && e.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/)) return "number";
                if (e.match(/^<<(?=\w)/)) return e.eatWhile(/\w/),
                    o(e, t, e.current().substr(2));
                if (e.sol() && e.match(/^\=item(?!\w)/)) return o(e, t, "=cut");
                var u = e.next();
                if (u == '"' || u == "'") {
                    if (e.prefix(3) == "<<" + u) {
                        var a = e.pos;
                        e.eatWhile(/\w/);
                        var f = e.current().substr(1);
                        if (f && e.eat(u)) return o(e, t, f);
                        e.pos = a
                    }
                    return s(e, t, [u], "string")
                }
                if (u == "q") {
                    var l = e.look( - 2);
                    if (!l || !/\w/.test(l)) {
                        l = e.look(0);
                        if (l == "x") {
                            l = e.look(1);
                            if (l == "(") return e.eatSuffix(2),
                                s(e, t, [")"], r, i);
                            if (l == "[") return e.eatSuffix(2),
                                s(e, t, ["]"], r, i);
                            if (l == "{") return e.eatSuffix(2),
                                s(e, t, ["}"], r, i);
                            if (l == "<") return e.eatSuffix(2),
                                s(e, t, [">"], r, i);
                            if (/[\^'"!~\/]/.test(l)) return e.eatSuffix(1),
                                s(e, t, [e.eat(l)], r, i)
                        } else if (l == "q") {
                            l = e.look(1);
                            if (l == "(") return e.eatSuffix(2),
                                s(e, t, [")"], "string");
                            if (l == "[") return e.eatSuffix(2),
                                s(e, t, ["]"], "string");
                            if (l == "{") return e.eatSuffix(2),
                                s(e, t, ["}"], "string");
                            if (l == "<") return e.eatSuffix(2),
                                s(e, t, [">"], "string");
                            if (/[\^'"!~\/]/.test(l)) return e.eatSuffix(1),
                                s(e, t, [e.eat(l)], "string")
                        } else if (l == "w") {
                            l = e.look(1);
                            if (l == "(") return e.eatSuffix(2),
                                s(e, t, [")"], "bracket");
                            if (l == "[") return e.eatSuffix(2),
                                s(e, t, ["]"], "bracket");
                            if (l == "{") return e.eatSuffix(2),
                                s(e, t, ["}"], "bracket");
                            if (l == "<") return e.eatSuffix(2),
                                s(e, t, [">"], "bracket");
                            if (/[\^'"!~\/]/.test(l)) return e.eatSuffix(1),
                                s(e, t, [e.eat(l)], "bracket")
                        } else if (l == "r") {
                            l = e.look(1);
                            if (l == "(") return e.eatSuffix(2),
                                s(e, t, [")"], r, i);
                            if (l == "[") return e.eatSuffix(2),
                                s(e, t, ["]"], r, i);
                            if (l == "{") return e.eatSuffix(2),
                                s(e, t, ["}"], r, i);
                            if (l == "<") return e.eatSuffix(2),
                                s(e, t, [">"], r, i);
                            if (/[\^'"!~\/]/.test(l)) return e.eatSuffix(1),
                                s(e, t, [e.eat(l)], r, i)
                        } else if (/[\^'"!~\/(\[{<]/.test(l)) {
                            if (l == "(") return e.eatSuffix(1),
                                s(e, t, [")"], "string");
                            if (l == "[") return e.eatSuffix(1),
                                s(e, t, ["]"], "string");
                            if (l == "{") return e.eatSuffix(1),
                                s(e, t, ["}"], "string");
                            if (l == "<") return e.eatSuffix(1),
                                s(e, t, [">"], "string");
                            if (/[\^'"!~\/]/.test(l)) return s(e, t, [e.eat(l)], "string")
                        }
                    }
                }
                if (u == "m") {
                    var l = e.look( - 2);
                    if (!l || !/\w/.test(l)) {
                        l = e.eat(/[(\[{<\^'"!~\/]/);
                        if (l) {
                            if (/[\^'"!~\/]/.test(l)) return s(e, t, [l], r, i);
                            if (l == "(") return s(e, t, [")"], r, i);
                            if (l == "[") return s(e, t, ["]"], r, i);
                            if (l == "{") return s(e, t, ["}"], r, i);
                            if (l == "<") return s(e, t, [">"], r, i)
                        }
                    }
                }
                if (u == "s") {
                    var l = /[\/>\]})\w]/.test(e.look( - 2));
                    if (!l) {
                        l = e.eat(/[(\[{<\^'"!~\/]/);
                        if (l) return l == "[" ? s(e, t, ["]", "]"], r, i) : l == "{" ? s(e, t, ["}", "}"], r, i) : l == "<" ? s(e, t, [">", ">"], r, i) : l == "(" ? s(e, t, [")", ")"], r, i) : s(e, t, [l, l], r, i)
                    }
                }
                if (u == "y") {
                    var l = /[\/>\]})\w]/.test(e.look( - 2));
                    if (!l) {
                        l = e.eat(/[(\[{<\^'"!~\/]/);
                        if (l) return l == "[" ? s(e, t, ["]", "]"], r, i) : l == "{" ? s(e, t, ["}", "}"], r, i) : l == "<" ? s(e, t, [">", ">"], r, i) : l == "(" ? s(e, t, [")", ")"], r, i) : s(e, t, [l, l], r, i)
                    }
                }
                if (u == "t") {
                    var l = /[\/>\]})\w]/.test(e.look( - 2));
                    if (!l) {
                        l = e.eat("r");
                        if (l) {
                            l = e.eat(/[(\[{<\^'"!~\/]/);
                            if (l) return l == "[" ? s(e, t, ["]", "]"], r, i) : l == "{" ? s(e, t, ["}", "}"], r, i) : l == "<" ? s(e, t, [">", ">"], r, i) : l == "(" ? s(e, t, [")", ")"], r, i) : s(e, t, [l, l], r, i)
                        }
                    }
                }
                if (u == "`") return s(e, t, [u], "variable-2");
                if (u == "/") return /~\s*$/.test(e.prefix()) ? s(e, t, [u], r, i) : "operator";
                if (u == "$") {
                    var a = e.pos;
                    if (e.eatWhile(/\d/) || e.eat("{") && e.eatWhile(/\d/) && e.eat("}")) return "variable-2";
                    e.pos = a
                }
                if (/[$@%]/.test(u)) {
                    var a = e.pos;
                    if (e.eat("^") && e.eat(/[A-Z]/) || !/[@$%&]/.test(e.look( - 2)) && e.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)) {
                        var l = e.current();
                        if (n[l]) return "variable-2"
                    }
                    e.pos = a
                }
                if (/[$@%&]/.test(u)) if (e.eatWhile(/[\w$\[\]]/) || e.eat("{") && e.eatWhile(/[\w$\[\]]/) && e.eat("}")) {
                    var l = e.current();
                    return n[l] ? "variable-2": "variable"
                }
                if (u == "#" && e.look( - 2) != "$") return e.skipToEnd(),
                    "comment";
                if (/[:+\-\^*$&%@=<>!?|\/~\.]/.test(u)) {
                    var a = e.pos;
                    e.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/);
                    if (n[e.current()]) return "operator";
                    e.pos = a
                }
                if (u == "_" && e.pos == 1) {
                    if (e.suffix(6) == "_END__") return s(e, t, ["\0"], "comment");
                    if (e.suffix(7) == "_DATA__") return s(e, t, ["\0"], "variable-2");
                    if (e.suffix(7) == "_C__") return s(e, t, ["\0"], "string")
                }
                if (/\w/.test(u)) {
                    var a = e.pos;
                    if (e.look( - 2) == "{" && (e.look(0) == "}" || e.eatWhile(/\w/) && e.look(0) == "}")) return "string";
                    e.pos = a
                }
                if (/[A-Z]/.test(u)) {
                    var c = e.look( - 2),
                        a = e.pos;
                    e.eatWhile(/[A-Z_]/);
                    if (!/[\da-z]/.test(e.look(0))) {
                        var l = n[e.current()];
                        return l ? (l[1] && (l = l[0]), c != ":" ? l == 1 ? "keyword": l == 2 ? "def": l == 3 ? "atom": l == 4 ? "operator": l == 5 ? "variable-2": "meta": "meta") : "meta"
                    }
                    e.pos = a
                }
                if (/[a-zA-Z_]/.test(u)) {
                    var c = e.look( - 2);
                    e.eatWhile(/\w/);
                    var l = n[e.current()];
                    return l ? (l[1] && (l = l[0]), c != ":" ? l == 1 ? "keyword": l == 2 ? "def": l == 3 ? "atom": l == 4 ? "operator": l == 5 ? "variable-2": "meta": "meta") : "meta"
                }
                return null
            }
            var n = {
                    "->": 4,
                    "++": 4,
                    "--": 4,
                    "**": 4,
                    "=~": 4,
                    "!~": 4,
                    "*": 4,
                    "/": 4,
                    "%": 4,
                    x: 4,
                    "+": 4,
                    "-": 4,
                    ".": 4,
                    "<<": 4,
                    ">>": 4,
                    "<": 4,
                    ">": 4,
                    "<=": 4,
                    ">=": 4,
                    lt: 4,
                    gt: 4,
                    le: 4,
                    ge: 4,
                    "==": 4,
                    "!=": 4,
                    "<=>": 4,
                    eq: 4,
                    ne: 4,
                    cmp: 4,
                    "~~": 4,
                    "&": 4,
                    "|": 4,
                    "^": 4,
                    "&&": 4,
                    "||": 4,
                    "//": 4,
                    "..": 4,
                    "...": 4,
                    "?": 4,
                    ":": 4,
                    "=": 4,
                    "+=": 4,
                    "-=": 4,
                    "*=": 4,
                    ",": 4,
                    "=>": 4,
                    "::": 4,
                    not: 4,
                    and: 4,
                    or: 4,
                    xor: 4,
                    BEGIN: [5, 1],
                    END: [5, 1],
                    PRINT: [5, 1],
                    PRINTF: [5, 1],
                    GETC: [5, 1],
                    READ: [5, 1],
                    READLINE: [5, 1],
                    DESTROY: [5, 1],
                    TIE: [5, 1],
                    TIEHANDLE: [5, 1],
                    UNTIE: [5, 1],
                    STDIN: 5,
                    STDIN_TOP: 5,
                    STDOUT: 5,
                    STDOUT_TOP: 5,
                    STDERR: 5,
                    STDERR_TOP: 5,
                    $ARG: 5,
                    $_: 5,
                    "@ARG": 5,
                    "@_": 5,
                    $LIST_SEPARATOR: 5,
                    '$"': 5,
                    $PROCESS_ID: 5,
                    $PID: 5,
                    $$: 5,
                    $REAL_GROUP_ID: 5,
                    $GID: 5,
                    "$(": 5,
                    $EFFECTIVE_GROUP_ID: 5,
                    $EGID: 5,
                    "$)": 5,
                    $PROGRAM_NAME: 5,
                    $0: 5,
                    $SUBSCRIPT_SEPARATOR: 5,
                    $SUBSEP: 5,
                    "$;": 5,
                    $REAL_USER_ID: 5,
                    $UID: 5,
                    "$<": 5,
                    $EFFECTIVE_USER_ID: 5,
                    $EUID: 5,
                    "$>": 5,
                    $a: 5,
                    $b: 5,
                    $COMPILING: 5,
                    "$^C": 5,
                    $DEBUGGING: 5,
                    "$^D": 5,
                    "${^ENCODING}": 5,
                    $ENV: 5,
                    "%ENV": 5,
                    $SYSTEM_FD_MAX: 5,
                    "$^F": 5,
                    "@F": 5,
                    "${^GLOBAL_PHASE}": 5,
                    "$^H": 5,
                    "%^H": 5,
                    "@INC": 5,
                    "%INC": 5,
                    $INPLACE_EDIT: 5,
                    "$^I": 5,
                    "$^M": 5,
                    $OSNAME: 5,
                    "$^O": 5,
                    "${^OPEN}": 5,
                    $PERLDB: 5,
                    "$^P": 5,
                    $SIG: 5,
                    "%SIG": 5,
                    $BASETIME: 5,
                    "$^T": 5,
                    "${^TAINT}": 5,
                    "${^UNICODE}": 5,
                    "${^UTF8CACHE}": 5,
                    "${^UTF8LOCALE}": 5,
                    $PERL_VERSION: 5,
                    "$^V": 5,
                    "${^WIN32_SLOPPY_STAT}": 5,
                    $EXECUTABLE_NAME: 5,
                    "$^X": 5,
                    $1: 5,
                    $MATCH: 5,
                    "$&": 5,
                    "${^MATCH}": 5,
                    $PREMATCH: 5,
                    "$`": 5,
                    "${^PREMATCH}": 5,
                    $POSTMATCH: 5,
                    "$'": 5,
                    "${^POSTMATCH}": 5,
                    $LAST_PAREN_MATCH: 5,
                    "$+": 5,
                    $LAST_SUBMATCH_RESULT: 5,
                    "$^N": 5,
                    "@LAST_MATCH_END": 5,
                    "@+": 5,
                    "%LAST_PAREN_MATCH": 5,
                    "%+": 5,
                    "@LAST_MATCH_START": 5,
                    "@-": 5,
                    "%LAST_MATCH_START": 5,
                    "%-": 5,
                    $LAST_REGEXP_CODE_RESULT: 5,
                    "$^R": 5,
                    "${^RE_DEBUG_FLAGS}": 5,
                    "${^RE_TRIE_MAXBUF}": 5,
                    $ARGV: 5,
                    "@ARGV": 5,
                    ARGV: 5,
                    ARGVOUT: 5,
                    $OUTPUT_FIELD_SEPARATOR: 5,
                    $OFS: 5,
                    "$,": 5,
                    $INPUT_LINE_NUMBER: 5,
                    $NR: 5,
                    "$.": 5,
                    $INPUT_RECORD_SEPARATOR: 5,
                    $RS: 5,
                    "$/": 5,
                    $OUTPUT_RECORD_SEPARATOR: 5,
                    $ORS: 5,
                    "$\\": 5,
                    $OUTPUT_AUTOFLUSH: 5,
                    "$|": 5,
                    $ACCUMULATOR: 5,
                    "$^A": 5,
                    $FORMAT_FORMFEED: 5,
                    "$^L": 5,
                    $FORMAT_PAGE_NUMBER: 5,
                    "$%": 5,
                    $FORMAT_LINES_LEFT: 5,
                    "$-": 5,
                    $FORMAT_LINE_BREAK_CHARACTERS: 5,
                    "$:": 5,
                    $FORMAT_LINES_PER_PAGE: 5,
                    "$=": 5,
                    $FORMAT_TOP_NAME: 5,
                    "$^": 5,
                    $FORMAT_NAME: 5,
                    "$~": 5,
                    "${^CHILD_ERROR_NATIVE}": 5,
                    $EXTENDED_OS_ERROR: 5,
                    "$^E": 5,
                    $EXCEPTIONS_BEING_CAUGHT: 5,
                    "$^S": 5,
                    $WARNING: 5,
                    "$^W": 5,
                    "${^WARNING_BITS}": 5,
                    $OS_ERROR: 5,
                    $ERRNO: 5,
                    "$!": 5,
                    "%OS_ERROR": 5,
                    "%ERRNO": 5,
                    "%!": 5,
                    $CHILD_ERROR: 5,
                    "$?": 5,
                    $EVAL_ERROR: 5,
                    "$@": 5,
                    $OFMT: 5,
                    "$#": 5,
                    "$*": 5,
                    $ARRAY_BASE: 5,
                    "$[": 5,
                    $OLD_PERL_VERSION: 5,
                    "$]": 5,
                    "if": [1, 1],
                    elsif: [1, 1],
                    "else": [1, 1],
                    "while": [1, 1],
                    unless: [1, 1],
                    "for": [1, 1],
                    foreach: [1, 1],
                    abs: 1,
                    accept: 1,
                    alarm: 1,
                    atan2: 1,
                    bind: 1,
                    binmode: 1,
                    bless: 1,
                    bootstrap: 1,
                    "break": 1,
                    caller: 1,
                    chdir: 1,
                    chmod: 1,
                    chomp: 1,
                    chop: 1,
                    chown: 1,
                    chr: 1,
                    chroot: 1,
                    close: 1,
                    closedir: 1,
                    connect: 1,
                    "continue": [1, 1],
                    cos: 1,
                    crypt: 1,
                    dbmclose: 1,
                    dbmopen: 1,
                    "default": 1,
                    defined: 1,
                    "delete": 1,
                    die: 1,
                    "do": 1,
                    dump: 1,
                    each: 1,
                    endgrent: 1,
                    endhostent: 1,
                    endnetent: 1,
                    endprotoent: 1,
                    endpwent: 1,
                    endservent: 1,
                    eof: 1,
                    eval: 1,
                    exec: 1,
                    exists: 1,
                    exit: 1,
                    exp: 1,
                    fcntl: 1,
                    fileno: 1,
                    flock: 1,
                    fork: 1,
                    format: 1,
                    formline: 1,
                    getc: 1,
                    getgrent: 1,
                    getgrgid: 1,
                    getgrnam: 1,
                    gethostbyaddr: 1,
                    gethostbyname: 1,
                    gethostent: 1,
                    getlogin: 1,
                    getnetbyaddr: 1,
                    getnetbyname: 1,
                    getnetent: 1,
                    getpeername: 1,
                    getpgrp: 1,
                    getppid: 1,
                    getpriority: 1,
                    getprotobyname: 1,
                    getprotobynumber: 1,
                    getprotoent: 1,
                    getpwent: 1,
                    getpwnam: 1,
                    getpwuid: 1,
                    getservbyname: 1,
                    getservbyport: 1,
                    getservent: 1,
                    getsockname: 1,
                    getsockopt: 1,
                    given: 1,
                    glob: 1,
                    gmtime: 1,
                    "goto": 1,
                    grep: 1,
                    hex: 1,
                    "import": 1,
                    index: 1,
                    "int": 1,
                    ioctl: 1,
                    join: 1,
                    keys: 1,
                    kill: 1,
                    last: 1,
                    lc: 1,
                    lcfirst: 1,
                    length: 1,
                    link: 1,
                    listen: 1,
                    local: 2,
                    localtime: 1,
                    lock: 1,
                    log: 1,
                    lstat: 1,
                    m: null,
                    map: 1,
                    mkdir: 1,
                    msgctl: 1,
                    msgget: 1,
                    msgrcv: 1,
                    msgsnd: 1,
                    my: 2,
                    "new": 1,
                    next: 1,
                    no: 1,
                    oct: 1,
                    open: 1,
                    opendir: 1,
                    ord: 1,
                    our: 2,
                    pack: 1,
                    "package": 1,
                    pipe: 1,
                    pop: 1,
                    pos: 1,
                    print: 1,
                    printf: 1,
                    prototype: 1,
                    push: 1,
                    q: null,
                    qq: null,
                    qr: null,
                    quotemeta: null,
                    qw: null,
                    qx: null,
                    rand: 1,
                    read: 1,
                    readdir: 1,
                    readline: 1,
                    readlink: 1,
                    readpipe: 1,
                    recv: 1,
                    redo: 1,
                    ref: 1,
                    rename: 1,
                    require: 1,
                    reset: 1,
                    "return": 1,
                    reverse: 1,
                    rewinddir: 1,
                    rindex: 1,
                    rmdir: 1,
                    s: null,
                    say: 1,
                    scalar: 1,
                    seek: 1,
                    seekdir: 1,
                    select: 1,
                    semctl: 1,
                    semget: 1,
                    semop: 1,
                    send: 1,
                    setgrent: 1,
                    sethostent: 1,
                    setnetent: 1,
                    setpgrp: 1,
                    setpriority: 1,
                    setprotoent: 1,
                    setpwent: 1,
                    setservent: 1,
                    setsockopt: 1,
                    shift: 1,
                    shmctl: 1,
                    shmget: 1,
                    shmread: 1,
                    shmwrite: 1,
                    shutdown: 1,
                    sin: 1,
                    sleep: 1,
                    socket: 1,
                    socketpair: 1,
                    sort: 1,
                    splice: 1,
                    split: 1,
                    sprintf: 1,
                    sqrt: 1,
                    srand: 1,
                    stat: 1,
                    state: 1,
                    study: 1,
                    sub: 1,
                    substr: 1,
                    symlink: 1,
                    syscall: 1,
                    sysopen: 1,
                    sysread: 1,
                    sysseek: 1,
                    system: 1,
                    syswrite: 1,
                    tell: 1,
                    telldir: 1,
                    tie: 1,
                    tied: 1,
                    time: 1,
                    times: 1,
                    tr: null,
                    truncate: 1,
                    uc: 1,
                    ucfirst: 1,
                    umask: 1,
                    undef: 1,
                    unlink: 1,
                    unpack: 1,
                    unshift: 1,
                    untie: 1,
                    use: 1,
                    utime: 1,
                    values: 1,
                    vec: 1,
                    wait: 1,
                    waitpid: 1,
                    wantarray: 1,
                    warn: 1,
                    when: 1,
                    write: 1,
                    y: null
                },
                r = "string-2",
                i = /[goseximacplud]/;
            return {
                startState: function() {
                    return {
                        tokenize: u,
                        chain: null,
                        style: null,
                        tail: null
                    }
                },
                token: function(e, t) {
                    return (t.tokenize || u)(e, t)
                },
                electricChars: "{}"
            }
        }),
    CodeMirror.defineMIME("text/x-perl", "perl"),
    CodeMirror.StringStream.prototype.look = function(e) {
        return this.string.charAt(this.pos + (e || 0))
    },
    CodeMirror.StringStream.prototype.prefix = function(e) {
        if (e) {
            var t = this.pos - e;
            return this.string.substr(t >= 0 ? t: 0, e)
        }
        return this.string.substr(0, this.pos - 1)
    },
    CodeMirror.StringStream.prototype.suffix = function(e) {
        var t = this.string.length,
            n = t - this.pos + 1;
        return this.string.substr(this.pos, e && e < t ? e: n)
    },
    CodeMirror.StringStream.prototype.nsuffix = function(e) {
        var t = this.pos,
            n = e || this.string.length - this.pos + 1;
        return this.pos += n,
            this.string.substr(t, n)
    },
    CodeMirror.StringStream.prototype.eatSuffix = function(e) {
        var t = this.pos + e,
            n;
        t <= 0 ? this.pos = 0 : t >= (n = this.string.length - 1) ? this.pos = n: this.pos = t
    },
    function() {
        function e(e) {
            var t = {},
                n = e.split(" ");
            for (var r = 0; r < n.length; ++r) t[n[r]] = !0;
            return t
        }
        function t(e) {
            return function(t, n) {
                return t.match(e) ? n.tokenize = null: t.skipToEnd(),
                    "string"
            }
        }
        var n = {
            name: "clike",
            keywords: e("abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent"),
            blockKeywords: e("catch do else elseif for foreach if switch try while"),
            atoms: e("true false null TRUE FALSE NULL"),
            multiLineStrings: !0,
            hooks: {
                $: function(e, t) {
                    return e.eatWhile(/[\w\$_]/),
                        "variable-2"
                },
                "<": function(e, n) {
                    return e.match(/<</) ? (e.eatWhile(/[\w\.]/), n.tokenize = t(e.current().slice(3)), n.tokenize(e, n)) : !1
                },
                "#": function(e, t) {
                    while (!e.eol() && !e.match("?>", !1)) e.next();
                    return "comment"
                },
                "/": function(e, t) {
                    if (e.eat("/")) {
                        while (!e.eol() && !e.match("?>", !1)) e.next();
                        return "comment"
                    }
                    return ! 1
                }
            }
        };
        CodeMirror.defineMode("php",
            function(e, t) {
                function u(e, t) {
                    var n = t.curMode == o;
                    e.sol() && t.pending != '"' && (t.pending = null);
                    if (t.curMode == r) {
                        if (e.match(/^<\?\w*/)) return t.curMode = o,
                            t.curState = t.php,
                            t.curClose = "?>",
                            "meta";
                        if (t.pending == '"') {
                            while (!e.eol() && e.next() != '"');
                            var a = "string"
                        } else if (t.pending && e.pos < t.pending.end) {
                            e.pos = t.pending.end;
                            var a = t.pending.style
                        } else var a = r.token(e, t.curState);
                        t.pending = null;
                        var f = e.current(),
                            l = f.search(/<\?/);
                        return l != -1 ? (a == "string" && /\"$/.test(f) && !/\?>/.test(f) ? t.pending = '"': t.pending = {
                            end: e.pos,
                            style: a
                        },
                            e.backUp(f.length - l)) : a == "tag" && e.current() == ">" && t.curState.context && (/^script$/i.test(t.curState.context.tagName) ? (t.curMode = i, t.curState = i.startState(r.indent(t.curState, "")), t.curClose = /^<\/\s*script\s*>/i) : /^style$/i.test(t.curState.context.tagName) && (t.curMode = s, t.curState = s.startState(r.indent(t.curState, "")), t.curClose = /^<\/\s*style\s*>/i)),
                            a
                    }
                    return (!n || t.php.tokenize == null) && e.match(t.curClose, n) ? (t.curMode = r, t.curState = t.html, t.curClose = null, n ? "meta": u(e, t)) : t.curMode.token(e, t.curState)
                }
                var r = CodeMirror.getMode(e, {
                        name: "xml",
                        htmlMode: !0
                    }),
                    i = CodeMirror.getMode(e, "javascript"),
                    s = CodeMirror.getMode(e, "css"),
                    o = CodeMirror.getMode(e, n);
                return {
                    startState: function() {
                        var e = r.startState();
                        return {
                            html: e,
                            php: o.startState(),
                            curMode: t.startOpen ? o: r,
                            curState: t.startOpen ? o.startState() : e,
                            curClose: t.startOpen ? /^\?>/: null,
                            mode: t.startOpen ? "php": "html",
                            pending: null
                        }
                    },
                    copyState: function(e) {
                        var t = e.html,
                            n = CodeMirror.copyState(r, t),
                            i = e.php,
                            s = CodeMirror.copyState(o, i),
                            u;
                        return e.curState == t ? u = n: e.curState == i ? u = s: u = CodeMirror.copyState(e.curMode, e.curState),
                        {
                            html: n,
                            php: s,
                            curMode: e.curMode,
                            curState: u,
                            curClose: e.curClose,
                            mode: e.mode,
                            pending: e.pending
                        }
                    },
                    token: u,
                    indent: function(e, t) {
                        return e.curMode != o && /^\s*<\//.test(t) || e.curMode == o && /^\?>/.test(t) ? r.indent(e.html, t) : e.curMode.indent(e.curState, t)
                    },
                    electricChars: "/{}:",
                    innerMode: function(e) {
                        return {
                            state: e.curState,
                            mode: e.curMode
                        }
                    }
                }
            },
            "xml", "clike", "javascript", "css"),
            CodeMirror.defineMIME("application/x-httpd-php", "php"),
            CodeMirror.defineMIME("application/x-httpd-php-open", {
                name: "php",
                startOpen: !0
            }),
            CodeMirror.defineMIME("text/x-php", n)
    } (),
    CodeMirror.defineMode("python",
        function(e, t) {
            function r(e) {
                return new RegExp("^((" + e.join(")|(") + "))\\b")
            }
            function b(e, t) {
                if (e.sol()) {
                    var r = t.scopes[0].offset;
                    if (e.eatSpace()) {
                        var c = e.indentation();
                        return c > r ? y = "indent": c < r && (y = "dedent"),
                            null
                    }
                    r > 0 && S(e, t)
                }
                if (e.eatSpace()) return null;
                var h = e.peek();
                if (h === "#") return e.skipToEnd(),
                    "comment";
                if (e.match(/^[0-9\.]/, !1)) {
                    var p = !1;
                    e.match(/^\d*\.\d+(e[\+\-]?\d+)?/i) && (p = !0),
                        e.match(/^\d+\.\d*/) && (p = !0),
                        e.match(/^\.\d+/) && (p = !0);
                    if (p) return e.eat(/J/i),
                        "number";
                    var d = !1;
                    e.match(/^0x[0-9a-f]+/i) && (d = !0),
                        e.match(/^0b[01]+/i) && (d = !0),
                        e.match(/^0o[0-7]+/i) && (d = !0),
                        e.match(/^[1-9]\d*(e[\+\-]?\d+)?/) && (e.eat(/J/i), d = !0),
                        e.match(/^0(?![\dx])/i) && (d = !0);
                    if (d) return e.eat(/L/i),
                        "number"
                }
                return e.match(v) ? (t.tokenize = w(e.current()), t.tokenize(e, t)) : e.match(a) || e.match(u) ? null: e.match(o) || e.match(i) || e.match(l) ? "operator": e.match(s) ? null: e.match(m) ? "keyword": e.match(g) ? "builtin": e.match(f) ? "variable": (e.next(), n)
            }
            function w(e) {
                while ("rub".indexOf(e.charAt(0).toLowerCase()) >= 0) e = e.substr(1);
                var r = e.length == 1,
                    i = "string";
                return function(o, u) {
                    while (!o.eol()) {
                        o.eatWhile(/[^'"\\]/);
                        if (o.eat("\\")) {
                            o.next();
                            if (r && o.eol()) return i
                        } else {
                            if (o.match(e)) return u.tokenize = b,
                                i;
                            o.eat(/['"]/)
                        }
                    }
                    if (r) {
                        if (t.singleLineStringErrors) return n;
                        u.tokenize = b
                    }
                    return i
                }
            }
            function E(t, n, r) {
                r = r || "py";
                var i = 0;
                if (r === "py") {
                    if (n.scopes[0].type !== "py") {
                        n.scopes[0].offset = t.indentation();
                        return
                    }
                    for (var s = 0; s < n.scopes.length; ++s) if (n.scopes[s].type === "py") {
                        i = n.scopes[s].offset + e.indentUnit;
                        break
                    }
                } else i = t.column() + t.current().length;
                n.scopes.unshift({
                    offset: i,
                    type: r
                })
            }
            function S(e, t, n) {
                n = n || "py";
                if (t.scopes.length == 1) return;
                if (t.scopes[0].type === "py") {
                    var r = e.indentation(),
                        i = -1;
                    for (var s = 0; s < t.scopes.length; ++s) if (r === t.scopes[s].offset) {
                        i = s;
                        break
                    }
                    if (i === -1) return ! 0;
                    while (t.scopes[0].offset !== r) t.scopes.shift();
                    return ! 1
                }
                return n === "py" ? (t.scopes[0].offset = e.indentation(), !1) : t.scopes[0].type != n ? !0 : (t.scopes.shift(), !1)
            }
            function x(e, t) {
                y = null;
                var r = t.tokenize(e, t),
                    i = e.current();
                if (i === ".") return r = e.match(f, !1) ? null: n,
                    r === null && t.lastToken === "meta" && (r = "meta"),
                    r;
                if (i === "@") return e.match(f, !1) ? "meta": n; (r === "variable" || r === "builtin") && t.lastToken === "meta" && (r = "meta");
                if (i === "pass" || i === "return") t.dedent += 1;
                i === "lambda" && (t.lambda = !0),
                    (i === ":" && !t.lambda && t.scopes[0].type == "py" || y === "indent") && E(e, t);
                var s = "[({".indexOf(i);
                return s !== -1 && E(e, t, "])}".slice(s, s + 1)),
                    y === "dedent" && S(e, t) ? n: (s = "])}".indexOf(i), s !== -1 && S(e, t, i) ? n: (t.dedent > 0 && e.eol() && t.scopes[0].type == "py" && (t.scopes.length > 1 && t.scopes.shift(), t.dedent -= 1), r))
            }
            var n = "error",
                i = new RegExp("^[\\+\\-\\*/%&|\\^~<>!]"),
                s = new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"),
                o = new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"),
                u = new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"),
                a = new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"),
                f = new RegExp("^[_A-Za-z][_A-Za-z0-9]*"),
                l = r(["and", "or", "not", "is", "in"]),
                c = ["as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield"],
                h = ["abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__"],
                p = {
                    builtins: ["apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None"],
                    keywords: ["exec", "print"]
                },
                d = {
                    builtins: ["ascii", "bytes", "exec", "print"],
                    keywords: ["nonlocal", "False", "True", "None"]
                };
            if (!t.version || parseInt(t.version, 10) !== 3) {
                c = c.concat(p.keywords),
                    h = h.concat(p.builtins);
                var v = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i")
            } else {
                c = c.concat(d.keywords),
                    h = h.concat(d.builtins);
                var v = new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))", "i")
            }
            var m = r(c),
                g = r(h),
                y = null,
                T = {
                    startState: function(e) {
                        return {
                            tokenize: b,
                            scopes: [{
                                offset: e || 0,
                                type: "py"
                            }],
                            lastToken: null,
                            lambda: !1,
                            dedent: 0
                        }
                    },
                    token: function(e, t) {
                        var n = x(e, t);
                        return t.lastToken = n,
                            e.eol() && e.lambda && (t.lambda = !1),
                            n
                    },
                    indent: function(e, t) {
                        return e.tokenize != b ? 0 : e.scopes[0].offset
                    }
                };
            return T
        }),
    CodeMirror.defineMIME("text/x-python", "python"),
    CodeMirror.defineMode("r",
        function(e) {
            function t(e) {
                var t = e.split(" "),
                    n = {};
                for (var r = 0; r < t.length; ++r) n[t[r]] = !0;
                return n
            }
            function a(e, t) {
                u = null;
                var a = e.next();
                if (a == "#") return e.skipToEnd(),
                    "comment";
                if (a == "0" && e.eat("x")) return e.eatWhile(/[\da-f]/i),
                    "number";
                if (a == "." && e.eat(/\d/)) return e.match(/\d*(?:e[+\-]?\d+)?/),
                    "number";
                if (/\d/.test(a)) return e.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/),
                    "number";
                if (a == "'" || a == '"') return t.tokenize = f(a),
                    "string";
                if (a == "." && e.match(/.[.\d]+/)) return "keyword";
                if (/[\w\.]/.test(a) && a != "_") {
                    e.eatWhile(/[\w\.]/);
                    var l = e.current();
                    return n.propertyIsEnumerable(l) ? "atom": i.propertyIsEnumerable(l) ? (s.propertyIsEnumerable(l) && (u = "block"), "keyword") : r.propertyIsEnumerable(l) ? "builtin": "variable"
                }
                return a == "%" ? (e.skipTo("%") && e.next(), "variable-2") : a == "<" && e.eat("-") ? "arrow": a == "=" && t.ctx.argList ? "arg-is": o.test(a) ? a == "$" ? "dollar": (e.eatWhile(o), "operator") : /[\(\){}\[\];]/.test(a) ? (u = a, a == ";" ? "semi": null) : null
            }
            function f(e) {
                return function(t, n) {
                    if (t.eat("\\")) {
                        var r = t.next();
                        return r == "x" ? t.match(/^[a-f0-9]{2}/i) : (r == "u" || r == "U") && t.eat("{") && t.skipTo("}") ? t.next() : r == "u" ? t.match(/^[a-f0-9]{4}/i) : r == "U" ? t.match(/^[a-f0-9]{8}/i) : /[0-7]/.test(r) && t.match(/^[0-7]{1,2}/),
                            "string-2"
                    }
                    var i;
                    while ((i = t.next()) != null) {
                        if (i == e) {
                            n.tokenize = a;
                            break
                        }
                        if (i == "\\") {
                            t.backUp(1);
                            break
                        }
                    }
                    return "string"
                }
            }
            function l(e, t, n) {
                e.ctx = {
                    type: t,
                    indent: e.indent,
                    align: null,
                    column: n.column(),
                    prev: e.ctx
                }
            }
            function c(e) {
                e.indent = e.ctx.indent,
                    e.ctx = e.ctx.prev
            }
            var n = t("NULL NA Inf NaN NA_integer_ NA_real_ NA_complex_ NA_character_"),
                r = t("list quote bquote eval return call parse deparse"),
                i = t("if else repeat while function for in next break"),
                s = t("if else repeat while function for"),
                o = /[+\-*\/^<>=!&|~$:]/,
                u;
            return {
                startState: function(t) {
                    return {
                        tokenize: a,
                        ctx: {
                            type: "top",
                            indent: -e.indentUnit,
                            align: !1
                        },
                        indent: 0,
                        afterIdent: !1
                    }
                },
                token: function(e, t) {
                    e.sol() && (t.ctx.align == null && (t.ctx.align = !1), t.indent = e.indentation());
                    if (e.eatSpace()) return null;
                    var n = t.tokenize(e, t);
                    n != "comment" && t.ctx.align == null && (t.ctx.align = !0);
                    var r = t.ctx.type;
                    return (u == ";" || u == "{" || u == "}") && r == "block" && c(t),
                        u == "{" ? l(t, "}", e) : u == "(" ? (l(t, ")", e), t.afterIdent && (t.ctx.argList = !0)) : u == "[" ? l(t, "]", e) : u == "block" ? l(t, "block", e) : u == r && c(t),
                        t.afterIdent = n == "variable" || n == "keyword",
                        n
                },
                indent: function(t, n) {
                    if (t.tokenize != a) return 0;
                    var r = n && n.charAt(0),
                        i = t.ctx,
                        s = r == i.type;
                    return i.type == "block" ? i.indent + (r == "{" ? 0 : e.indentUnit) : i.align ? i.column + (s ? 0 : 1) : i.indent + (s ? 0 : e.indentUnit)
                }
            }
        }),
    CodeMirror.defineMIME("text/x-rsrc", "r"),
    CodeMirror.defineMode("ruby",
        function(e, t) {
            function n(e) {
                var t = {};
                for (var n = 0,
                         r = e.length; n < r; ++n) t[e[n]] = !0;
                return t
            }
            function a(e, t, n) {
                return n.tokenize.push(e),
                    e(t, n)
            }
            function f(e, t) {
                u = null;
                if (e.sol() && e.match("=begin") && e.eol()) return t.tokenize.push(p),
                    "comment";
                if (e.eatSpace()) return null;
                var n = e.next(),
                    r;
                if (n == "`" || n == "'" || n == '"' || n == "/" && !e.eol() && e.peek() != " ") return a(c(n, "string", n == '"' || n == "`"), e, t);
                if (n == "%") {
                    var i, s = !1;
                    e.eat("s") ? i = "atom": e.eat(/[WQ]/) ? (i = "string", s = !0) : e.eat(/[wxqr]/) && (i = "string");
                    var f = e.eat(/[^\w\s]/);
                    return f ? (o.propertyIsEnumerable(f) && (f = o[f]), a(c(f, i, s, !0), e, t)) : "operator"
                }
                if (n == "#") return e.skipToEnd(),
                    "comment";
                if (n == "<" && (r = e.match(/^<-?[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))) return a(h(r[1]), e, t);
                if (n == "0") return e.eat("x") ? e.eatWhile(/[\da-fA-F]/) : e.eat("b") ? e.eatWhile(/[01]/) : e.eatWhile(/[0-7]/),
                    "number";
                if (/\d/.test(n)) return e.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/),
                    "number";
                if (n == "?") {
                    while (e.match(/^\\[CM]-/));
                    return e.eat("\\") ? e.eatWhile(/\w/) : e.next(),
                        "string"
                }
                return n == ":" ? e.eat("'") ? a(c("'", "atom", !1), e, t) : e.eat('"') ? a(c('"', "atom", !0), e, t) : (e.eatWhile(/[\w\?]/), "atom") : n == "@" ? (e.eat("@"), e.eatWhile(/[\w\?]/), "variable-2") : n == "$" ? (e.next(), e.eatWhile(/[\w\?]/), "variable-3") : /\w/.test(n) ? (e.eatWhile(/[\w\?]/), e.eat(":") ? "atom": "ident") : n != "|" || !t.varList && t.lastTok != "{" && t.lastTok != "do" ? /[\(\)\[\]{}\\;]/.test(n) ? (u = n, null) : n == "-" && e.eat(">") ? "arrow": /[=+\-\/*:\.^%<>~|]/.test(n) ? (e.eatWhile(/[=+\-\/*:\.^%<>~|]/), "operator") : null: (u = "|", null)
            }
            function l() {
                var e = 1;
                return function(t, n) {
                    if (t.peek() == "}") {
                        e--;
                        if (e == 0) return n.tokenize.pop(),
                            n.tokenize[n.tokenize.length - 1](t, n)
                    } else t.peek() == "{" && e++;
                    return f(t, n)
                }
            }
            function c(e, t, n, r) {
                return function(i, s) {
                    var o = !1,
                        u;
                    while ((u = i.next()) != null) {
                        if (u == e && (r || !o)) {
                            s.tokenize.pop();
                            break
                        }
                        if (n && u == "#" && !o && i.eat("{")) {
                            s.tokenize.push(l(arguments.callee));
                            break
                        }
                        o = !o && u == "\\"
                    }
                    return t
                }
            }
            function h(e) {
                return function(t, n) {
                    return t.match(e) ? n.tokenize.pop() : t.skipToEnd(),
                        "string"
                }
            }
            function p(e, t) {
                return e.sol() && e.match("=end") && e.eol() && t.tokenize.pop(),
                    e.skipToEnd(),
                    "comment"
            }
            var r = n(["alias", "and", "BEGIN", "begin", "break", "case", "class", "def", "defined?", "do", "else", "elsif", "END", "end", "ensure", "false", "for", "if", "in", "module", "next", "not", "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless", "until", "when", "while", "yield", "nil", "raise", "throw", "catch", "fail", "loop", "callcc", "caller", "lambda", "proc", "public", "protected", "private", "require", "load", "require_relative", "extend", "autoload"]),
                i = n(["def", "class", "case", "for", "while", "do", "module", "then", "catch", "loop", "proc", "begin"]),
                s = n(["end", "until"]),
                o = {
                    "[": "]",
                    "{": "}",
                    "(": ")"
                },
                u;
            return {
                startState: function() {
                    return {
                        tokenize: [f],
                        indented: 0,
                        context: {
                            type: "top",
                            indented: -e.indentUnit
                        },
                        continuedLine: !1,
                        lastTok: null,
                        varList: !1
                    }
                },
                token: function(e, t) {
                    e.sol() && (t.indented = e.indentation());
                    var n = t.tokenize[t.tokenize.length - 1](e, t),
                        o;
                    if (n == "ident") {
                        var a = e.current();
                        n = r.propertyIsEnumerable(e.current()) ? "keyword": /^[A-Z]/.test(a) ? "tag": t.lastTok == "def" || t.lastTok == "class" || t.varList ? "def": "variable",
                            i.propertyIsEnumerable(a) ? o = "indent": s.propertyIsEnumerable(a) ? o = "dedent": (a == "if" || a == "unless") && e.column() == e.indentation() && (o = "indent")
                    }
                    if (u || n && n != "comment") t.lastTok = a || u || n;
                    return u == "|" && (t.varList = !t.varList),
                        o == "indent" || /[\(\[\{]/.test(u) ? t.context = {
                            prev: t.context,
                            type: u || n,
                            indented: t.indented
                        }: (o == "dedent" || /[\)\]\}]/.test(u)) && t.context.prev && (t.context = t.context.prev),
                        e.eol() && (t.continuedLine = u == "\\" || n == "operator"),
                        n
                },
                indent: function(t, n) {
                    if (t.tokenize[t.tokenize.length - 1] != f) return 0;
                    var r = n && n.charAt(0),
                        i = t.context,
                        s = i.type == o[r] || i.type == "keyword" && /^(?:end|until|else|elsif|when|rescue)\b/.test(n);
                    return i.indented + (s ? 0 : e.indentUnit) + (t.continuedLine ? e.indentUnit: 0)
                },
                electricChars: "}de"
            }
        }),
    CodeMirror.defineMIME("text/x-ruby", "ruby"),
    CodeMirror.defineMode("shell",
        function(e) {
            function n(e, n) {
                var r = n.split(" ");
                for (var i = 0; i < r.length; i++) t[r[i]] = e
            }
            function r(e, n) {
                var r = e.sol(),
                    u = e.next();
                if (u === "'" || u === '"' || u === "`") return n.tokens.unshift(i(u)),
                    o(e, n);
                if (u === "#") return r && e.eat("!") ? (e.skipToEnd(), "meta") : (e.skipToEnd(), "comment");
                if (u === "$") return n.tokens.unshift(s),
                    o(e, n);
                if (u === "+" || u === "=") return "operator";
                if (u === "-") return e.eat("-"),
                    e.eatWhile(/\w/),
                    "attribute";
                if (/\d/.test(u)) {
                    e.eatWhile(/\d/);
                    if (!/\w/.test(e.peek())) return "number"
                }
                e.eatWhile(/\w/);
                var a = e.current();
                return e.peek() === "=" && /\w+/.test(a) ? "def": t.hasOwnProperty(a) ? t[a] : null
            }
            function i(e) {
                return function(t, n) {
                    var r, i = !1,
                        o = !1;
                    while ((r = t.next()) != null) {
                        if (r === e && !o) {
                            i = !0;
                            break
                        }
                        if (r === "$" && !o && e !== "'") {
                            o = !0,
                                t.backUp(1),
                                n.tokens.unshift(s);
                            break
                        }
                        o = !o && r === "\\"
                    }
                    return (i || !o) && n.tokens.shift(),
                        e === "`" || e === ")" ? "quote": "string"
                }
            }
            function o(e, t) {
                return (t.tokens[0] || r)(e, t)
            }
            var t = {};
            n("atom", "true false"),
                n("keyword", "if then do else elif while until for in esac fi fin fil done exit set unset export function"),
                n("builtin", "ab awk bash beep cat cc cd chown chmod chroot clear cp curl cut diff echo find gawk gcc get git grep kill killall ln ls make mkdir openssl mv nc node npm ping ps restart rm rmdir sed service sh shopt shred source sort sleep ssh start stop su sudo tee telnet top touch vi vim wall wc wget who write yes zsh");
            var s = function(e, t) {
                t.tokens.length > 1 && e.eat("$");
                var n = e.next(),
                    r = /\w/;
                return n === "{" && (r = /[^}]/),
                    n === "(" ? (t.tokens[0] = i(")"), o(e, t)) : (/\d/.test(n) || (e.eatWhile(r), e.eat("}")), t.tokens.shift(), "def")
            };
            return {
                startState: function() {
                    return {
                        tokens: []
                    }
                },
                token: function(e, t) {
                    return e.eatSpace() ? null: o(e, t)
                }
            }
        }),
    CodeMirror.defineMIME("text/x-sh", "shell"),
    CodeMirror.defineMode("smarty",
        function(e, t) {
            function u(e, t) {
                return r = t,
                    e
            }
            function a(e, t) {
                function n(n) {
                    return t.tokenize = n,
                        n(e, t)
                }
                return e.match(s, !0) ? e.eat("*") ? n(c("comment", "*" + o)) : (t.tokenize = f, "tag") : (e.next(), null)
            }
            function f(e, t) {
                if (e.match(o, !0)) return t.tokenize = a,
                    u("tag", null);
                var s = e.next();
                if (s == "$") return e.eatWhile(i.validIdentifier),
                    u("variable-2", "variable");
                if (s == ".") return u("operator", "property");
                if (i.stringChar.test(s)) return t.tokenize = l(s),
                    u("string", "string");
                if (i.operatorChars.test(s)) return e.eatWhile(i.operatorChars),
                    u("operator", "operator");
                if (s == "[" || s == "]") return u("bracket", "bracket");
                if (/\d/.test(s)) return e.eatWhile(/\d/),
                    u("number", "number");
                if (t.last == "variable") {
                    if (s == "@") return e.eatWhile(i.validIdentifier),
                        u("property", "property");
                    if (s == "|") return e.eatWhile(i.validIdentifier),
                        u("qualifier", "modifier")
                } else {
                    if (t.last == "whitespace") return e.eatWhile(i.validIdentifier),
                        u("attribute", "modifier");
                    if (t.last == "property") return e.eatWhile(i.validIdentifier),
                        u("property", null);
                    if (/\s/.test(s)) return r = "whitespace",
                        null
                }
                var f = "";
                s != "/" && (f += s);
                var c = "";
                while (c = e.eat(i.validIdentifier)) f += c;
                var h, p;
                for (h = 0, p = n.length; h < p; h++) if (n[h] == f) return u("keyword", "keyword");
                return /\s/.test(s) ? null: u("tag", "tag")
            }
            function l(e) {
                return function(t, n) {
                    while (!t.eol()) if (t.next() == e) {
                        n.tokenize = f;
                        break
                    }
                    return "string"
                }
            }
            function c(e, t) {
                return function(n, r) {
                    while (!n.eol()) {
                        if (n.match(t)) {
                            r.tokenize = a;
                            break
                        }
                        n.next()
                    }
                    return e
                }
            }
            var n = ["debug", "extends", "function", "include", "literal"],
                r,
                i = {
                    operatorChars: /[+\-*&%=<>!?]/,
                    validIdentifier: /[a-zA-Z0-9\_]/,
                    stringChar: /[\'\"]/
                },
                s = typeof e.mode.leftDelimiter != "undefined" ? e.mode.leftDelimiter: "{",
                o = typeof e.mode.rightDelimiter != "undefined" ? e.mode.rightDelimiter: "}";
            return {
                startState: function() {
                    return {
                        tokenize: a,
                        mode: "smarty",
                        last: null
                    }
                },
                token: function(e, t) {
                    var n = t.tokenize(e, t);
                    return t.last = r,
                        n
                },
                electricChars: ""
            }
        }),
    CodeMirror.defineMIME("text/x-smarty", "smarty"),
    CodeMirror.defineMode("xml",
        function(e, t) {
            function u(e, t) {
                function n(n) {
                    return t.tokenize = n,
                        n(e, t)
                }
                var r = e.next();
                if (r == "<") {
                    if (e.eat("!")) return e.eat("[") ? e.match("CDATA[") ? n(l("atom", "]]>")) : null: e.match("--") ? n(l("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), n(c(1))) : null;
                    if (e.eat("?")) return e.eatWhile(/[\w\._\-]/),
                        t.tokenize = l("meta", "?>"),
                        "meta";
                    o = e.eat("/") ? "closeTag": "openTag",
                        e.eatSpace(),
                        s = "";
                    var i;
                    while (i = e.eat(/[^\s\u00a0=<>\"\'\/?]/)) s += i;
                    return t.tokenize = a,
                        "tag"
                }
                if (r == "&") {
                    var u;
                    return e.eat("#") ? e.eat("x") ? u = e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : u = e.eatWhile(/[\d]/) && e.eat(";") : u = e.eatWhile(/[\w\.\-:]/) && e.eat(";"),
                        u ? "atom": "error"
                }
                return e.eatWhile(/[^&<]/),
                    null
            }
            function a(e, t) {
                var n = e.next();
                return n == ">" || n == "/" && e.eat(">") ? (t.tokenize = u, o = n == ">" ? "endTag": "selfcloseTag", "tag") : n == "=" ? (o = "equals", null) : /[\'\"]/.test(n) ? (t.tokenize = f(n), t.tokenize(e, t)) : (e.eatWhile(/[^\s\u00a0=<>\"\'\/?]/), "word")
            }
            function f(e) {
                return function(t, n) {
                    while (!t.eol()) if (t.next() == e) {
                        n.tokenize = a;
                        break
                    }
                    return "string"
                }
            }
            function l(e, t) {
                return function(n, r) {
                    while (!n.eol()) {
                        if (n.match(t)) {
                            r.tokenize = u;
                            break
                        }
                        n.next()
                    }
                    return e
                }
            }
            function c(e) {
                return function(t, n) {
                    var r;
                    while ((r = t.next()) != null) {
                        if (r == "<") return n.tokenize = c(e + 1),
                            n.tokenize(t, n);
                        if (r == ">") {
                            if (e == 1) {
                                n.tokenize = u;
                                break
                            }
                            return n.tokenize = c(e - 1),
                                n.tokenize(t, n)
                        }
                    }
                    return "meta"
                }
            }
            function d() {
                for (var e = arguments.length - 1; e >= 0; e--) h.cc.push(arguments[e])
            }
            function v() {
                return d.apply(null, arguments),
                    !0
            }
            function m(e, t) {
                var n = r.doNotIndent.hasOwnProperty(e) || h.context && h.context.noIndent;
                h.context = {
                    prev: h.context,
                    tagName: e,
                    indent: h.indented,
                    startOfLine: t,
                    noIndent: n
                }
            }
            function g() {
                h.context && (h.context = h.context.prev)
            }
            function y(e) {
                if (e == "openTag") return h.tagName = s,
                    v(S, b(h.startOfLine));
                if (e == "closeTag") {
                    var t = !1;
                    return h.context ? h.context.tagName != s && (r.implicitlyClosed.hasOwnProperty(h.context.tagName.toLowerCase()) && g(), t = !h.context || h.context.tagName != s) : t = !0,
                        t && (p = "error"),
                        v(w(t))
                }
                return v()
            }
            function b(e) {
                return function(t) {
                    return t == "selfcloseTag" || t == "endTag" && r.autoSelfClosers.hasOwnProperty(h.tagName.toLowerCase()) ? (E(h.tagName.toLowerCase()), v()) : t == "endTag" ? (E(h.tagName.toLowerCase()), m(h.tagName, e), v()) : v()
                }
            }
            function w(e) {
                return function(t) {
                    return e && (p = "error"),
                        t == "endTag" ? (g(), v()) : (p = "error", v(arguments.callee))
                }
            }
            function E(e) {
                var t;
                for (;;) {
                    if (!h.context) return;
                    t = h.context.tagName.toLowerCase();
                    if (!r.contextGrabbers.hasOwnProperty(t) || !r.contextGrabbers[t].hasOwnProperty(e)) return;
                    g()
                }
            }
            function S(e) {
                return e == "word" ? (p = "attribute", v(x, S)) : e == "endTag" || e == "selfcloseTag" ? d() : (p = "error", v(S))
            }
            function x(e) {
                return e == "equals" ? v(T, S) : (r.allowMissing || (p = "error"), e == "endTag" || e == "selfcloseTag" ? d() : v())
            }
            function T(e) {
                return e == "string" ? v(N) : e == "word" && r.allowUnquoted ? (p = "string", v()) : (p = "error", e == "endTag" || e == "selfCloseTag" ? d() : v())
            }
            function N(e) {
                return e == "string" ? v(N) : d()
            }
            var n = e.indentUnit,
                r = t.htmlMode ? {
                    autoSelfClosers: {
                        area: !0,
                        base: !0,
                        br: !0,
                        col: !0,
                        command: !0,
                        embed: !0,
                        frame: !0,
                        hr: !0,
                        img: !0,
                        input: !0,
                        keygen: !0,
                        link: !0,
                        meta: !0,
                        param: !0,
                        source: !0,
                        track: !0,
                        wbr: !0
                    },
                    implicitlyClosed: {
                        dd: !0,
                        li: !0,
                        optgroup: !0,
                        option: !0,
                        p: !0,
                        rp: !0,
                        rt: !0,
                        tbody: !0,
                        td: !0,
                        tfoot: !0,
                        th: !0,
                        tr: !0
                    },
                    contextGrabbers: {
                        dd: {
                            dd: !0,
                            dt: !0
                        },
                        dt: {
                            dd: !0,
                            dt: !0
                        },
                        li: {
                            li: !0
                        },
                        option: {
                            option: !0,
                            optgroup: !0
                        },
                        optgroup: {
                            optgroup: !0
                        },
                        p: {
                            address: !0,
                            article: !0,
                            aside: !0,
                            blockquote: !0,
                            dir: !0,
                            div: !0,
                            dl: !0,
                            fieldset: !0,
                            footer: !0,
                            form: !0,
                            h1: !0,
                            h2: !0,
                            h3: !0,
                            h4: !0,
                            h5: !0,
                            h6: !0,
                            header: !0,
                            hgroup: !0,
                            hr: !0,
                            menu: !0,
                            nav: !0,
                            ol: !0,
                            p: !0,
                            pre: !0,
                            section: !0,
                            table: !0,
                            ul: !0
                        },
                        rp: {
                            rp: !0,
                            rt: !0
                        },
                        rt: {
                            rp: !0,
                            rt: !0
                        },
                        tbody: {
                            tbody: !0,
                            tfoot: !0
                        },
                        td: {
                            td: !0,
                            th: !0
                        },
                        tfoot: {
                            tbody: !0
                        },
                        th: {
                            td: !0,
                            th: !0
                        },
                        thead: {
                            tbody: !0,
                            tfoot: !0
                        },
                        tr: {
                            tr: !0
                        }
                    },
                    doNotIndent: {
                        pre: !0
                    },
                    allowUnquoted: !0,
                    allowMissing: !0
                }: {
                    autoSelfClosers: {},
                    implicitlyClosed: {},
                    contextGrabbers: {},
                    doNotIndent: {},
                    allowUnquoted: !1,
                    allowMissing: !1
                },
                i = t.alignCDATA,
                s,
                o,
                h,
                p;
            return {
                startState: function() {
                    return {
                        tokenize: u,
                        cc: [],
                        indented: 0,
                        startOfLine: !0,
                        tagName: null,
                        context: null
                    }
                },
                token: function(e, t) {
                    e.sol() && (t.startOfLine = !0, t.indented = e.indentation());
                    if (e.eatSpace()) return null;
                    p = o = s = null;
                    var n = t.tokenize(e, t);
                    t.type = o;
                    if ((n || o) && n != "comment") {
                        h = t;
                        for (;;) {
                            var r = t.cc.pop() || y;
                            if (r(o || n)) break
                        }
                    }
                    return t.startOfLine = !1,
                        p || n
                },
                indent: function(e, t, r) {
                    var s = e.context;
                    if (e.tokenize != a && e.tokenize != u || s && s.noIndent) return r ? r.match(/^(\s*)/)[0].length: 0;
                    if (i && /<!\[CDATA\[/.test(t)) return 0;
                    s && /^<\//.test(t) && (s = s.prev);
                    while (s && !s.startOfLine) s = s.prev;
                    return s ? s.indent + n: 0
                },
                electricChars: "/"
            }
        }),
    CodeMirror.defineMIME("text/xml", "xml"),
    CodeMirror.defineMIME("application/xml", "xml"),
    CodeMirror.mimeModes.hasOwnProperty("text/html") || CodeMirror.defineMIME("text/html", {
        name: "xml",
        htmlMode: !0
    }),
    CodeMirror.defineMode("yaml",
        function() {
            var e = ["true", "false", "on", "off", "yes", "no"],
                t = new RegExp("\\b((" + e.join(")|(") + "))$", "i");
            return {
                token: function(e, n) {
                    var r = e.peek(),
                        i = n.escaped;
                    n.escaped = !1;
                    if (r == "#") return e.skipToEnd(),
                        "comment";
                    if (n.literal && e.indentation() > n.keyCol) return e.skipToEnd(),
                        "string";
                    n.literal && (n.literal = !1);
                    if (e.sol()) {
                        n.keyCol = 0,
                            n.pair = !1,
                            n.pairStart = !1;
                        if (e.match(/---/)) return "def";
                        if (e.match(/\.\.\./)) return "def";
                        if (e.match(/\s*-\s+/)) return "meta"
                    }
                    if (!n.pair && e.match(/^\s*([a-z0-9\._-])+(?=\s*:)/i)) return n.pair = !0,
                        n.keyCol = e.indentation(),
                        "atom";
                    if (n.pair && e.match(/^:\s*/)) return n.pairStart = !0,
                        "meta";
                    if (e.match(/^(\{|\}|\[|\])/)) return r == "{" ? n.inlinePairs++:r == "}" ? n.inlinePairs--:r == "[" ? n.inlineList++:n.inlineList--,
                        "meta";
                    if (n.inlineList > 0 && !i && r == ",") return e.next(),
                        "meta";
                    if (n.inlinePairs > 0 && !i && r == ",") return n.keyCol = 0,
                        n.pair = !1,
                        n.pairStart = !1,
                        e.next(),
                        "meta";
                    if (n.pairStart) {
                        if (e.match(/^\s*(\||\>)\s*/)) return n.literal = !0,
                            "meta";
                        if (e.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i)) return "variable-2";
                        if (n.inlinePairs == 0 && e.match(/^\s*-?[0-9\.\,]+\s?$/)) return "number";
                        if (n.inlinePairs > 0 && e.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/)) return "number";
                        if (e.match(t)) return "keyword"
                    }
                    return n.pairStart = !1,
                        n.escaped = r == "\\",
                        e.next(),
                        null
                },
                startState: function() {
                    return {
                        pair: !1,
                        pairStart: !1,
                        keyCol: 0,
                        inlinePairs: 0,
                        inlineList: 0,
                        literal: !1,
                        escaped: !1
                    }
                }
            }
        }),
    CodeMirror.defineMIME("text/x-yaml", "yaml"),
    function() {
        function e(e, t, n, r) {
            this.atOccurrence = !1,
                this.cm = e,
                r == null && typeof t == "string" && (r = !1),
                n = n ? e.clipPos(n) : {
                    line: 0,
                    ch: 0
                },
                this.pos = {
                    from: n,
                    to: n
                };
            if (typeof t != "string") t.global || (t = new RegExp(t.source, t.ignoreCase ? "ig": "g")),
                this.matches = function(n, r) {
                    if (n) {
                        t.lastIndex = 0;
                        var i = e.getLine(r.line).slice(0, r.ch),
                            s = t.exec(i),
                            o = 0;
                        while (s) {
                            o += s.index + 1,
                                i = i.slice(o),
                                t.lastIndex = 0;
                            var u = t.exec(i);
                            if (!u) break;
                            s = u
                        }
                        o--
                    } else {
                        t.lastIndex = r.ch;
                        var i = e.getLine(r.line),
                            s = t.exec(i),
                            o = s && s.index
                    }
                    if (s) return {
                        from: {
                            line: r.line,
                            ch: o
                        },
                        to: {
                            line: r.line,
                            ch: o + s[0].length
                        },
                        match: s
                    }
                };
            else {
                r && (t = t.toLowerCase());
                var i = r ?
                        function(e) {
                            return e.toLowerCase()
                        }: function(e) {
                        return e
                    },
                    s = t.split("\n");
                s.length == 1 ? this.matches = function(n, r) {
                    var s = i(e.getLine(r.line)),
                        o = t.length,
                        u;
                    if (n ? r.ch >= o && (u = s.lastIndexOf(t, r.ch - o)) != -1 : (u = s.indexOf(t, r.ch)) != -1) return {
                        from: {
                            line: r.line,
                            ch: u
                        },
                        to: {
                            line: r.line,
                            ch: u + o
                        }
                    }
                }: this.matches = function(t, n) {
                    var r = n.line,
                        o = t ? s.length - 1 : 0,
                        u = s[o],
                        a = i(e.getLine(r)),
                        f = t ? a.indexOf(u) + u.length: a.lastIndexOf(u);
                    if (t ? f >= n.ch || f != u.length: f <= n.ch || f != a.length - u.length) return;
                    for (;;) {
                        if (t ? !r: r == e.lineCount() - 1) return;
                        a = i(e.getLine(r += t ? -1 : 1)),
                            u = s[t ? --o: ++o];
                        if (o > 0 && o < s.length - 1) {
                            if (a != u) return;
                            continue
                        }
                        var l = t ? a.lastIndexOf(u) : a.indexOf(u) + u.length;
                        if (t ? l != a.length - u.length: l != u.length) return;
                        var c = {
                                line: n.line,
                                ch: f
                            },
                            h = {
                                line: r,
                                ch: l
                            };
                        return {
                            from: t ? h: c,
                            to: t ? c: h
                        }
                    }
                }
            }
        }
        e.prototype = {
            findNext: function() {
                return this.find(!1)
            },
            findPrevious: function() {
                return this.find(!0)
            },
            find: function(e) {
                function r(e) {
                    var n = {
                        line: e,
                        ch: 0
                    };
                    return t.pos = {
                        from: n,
                        to: n
                    },
                        t.atOccurrence = !1,
                        !1
                }
                var t = this,
                    n = this.cm.clipPos(e ? this.pos.from: this.pos.to);
                for (;;) {
                    if (this.pos = this.matches(e, n)) return this.atOccurrence = !0,
                        this.pos.match || !0;
                    if (e) {
                        if (!n.line) return r(0);
                        n = {
                            line: n.line - 1,
                            ch: this.cm.getLine(n.line - 1).length
                        }
                    } else {
                        var i = this.cm.lineCount();
                        if (n.line == i - 1) return r(i);
                        n = {
                            line: n.line + 1,
                            ch: 0
                        }
                    }
                }
            },
            from: function() {
                if (this.atOccurrence) return this.pos.from
            },
            to: function() {
                if (this.atOccurrence) return this.pos.to
            },
            replace: function(e) {
                var t = this;
                this.atOccurrence && (t.pos.to = this.cm.replaceRange(e, t.pos.from, t.pos.to))
            }
        },
            CodeMirror.defineExtension("getSearchCursor",
                function(t, n, r) {
                    return new e(this, t, n, r)
                })
    } (),
    function() {
        function t() {
            this.marked = []
        }
        function n(e) {
            return e._matchHighlightState || (e._matchHighlightState = new t)
        }
        function r(e) {
            var t = n(e);
            for (var r = 0; r < t.marked.length; ++r) t.marked[r].clear();
            t.marked = []
        }
        function i(t, i, s) {
            r(t),
                s = typeof s != "undefined" ? s: e;
            if (t.somethingSelected() && t.getSelection().replace(/^\s+|\s+$/g, "").length >= s) {
                var o = n(t),
                    u = t.getSelection();
                t.operation(function() {
                    if (t.lineCount() < 2e3) for (var e = t.getSearchCursor(u); e.findNext();)(e.from().line !== t.getCursor(!0).line || e.from().ch !== t.getCursor(!0).ch) && o.marked.push(t.markText(e.from(), e.to(), i))
                })
            }
        }
        var e = 2;
        CodeMirror.defineExtension("matchHighlight",
            function(e, t) {
                i(this, e, t)
            })
    } ()