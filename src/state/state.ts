/// <reference path="../../lib/angular/angular-1.0.d.ts" />
/// <reference path="../common.ts" />
/// <reference path="../interfaces.d.ts" />

/// <reference path="stateRules.ts" />
/// <reference path="stateFactory.ts" />

class State {
    private _children: { [name: string]: State; } = {};
    private _self: dotjem.routing.IRegisteredState;
    private _reloadOnOptional: bool;
    private _route: any;

    get children(): any { return this._children; }
    get fullname(): string { return this._fullname; }
    get name(): string { return this._name; }
    get reloadOnOptional(): bool { return this._reloadOnOptional; }
    get self(): dotjem.routing.IRegisteredState { return copy(this._self); }
    get parent(): State { return this._parent; }
    get route(): any { return this._route; }
    get root(): State {
        if (this.parent === null)
            return this;
        return this._parent.root;
    }

    set route(value: any) {
        if (isUndefined(value))
            throw Error(errors.routeCannotBeUndefined);
        this._route = value;
    }

    set reloadOnOptional(value: any) {
        this._reloadOnOptional = value;
    }

    constructor(private _name: string, private _fullname: string, _self: dotjem.routing.IState, private _parent?: State) {
        this._self = <dotjem.routing.IRegisteredState>_self;
        this._self.$fullname = _fullname;
        this._reloadOnOptional = !isDefined(_self.reloadOnSearch) || _self.reloadOnSearch;
    }

    public add(child: State): State {
        this._children[child.name] = child;
        return this;
    }

    public resolveRoute(): string {
        return isDefined(this.route) ? this.route.route
             : isDefined(this.parent) ? this.parent.resolveRoute()
             : '';
    }

    public toUrl(params: any[]): string {


        return "";
    }
}
