module.exports = class QueryBuilder {
    constructor() {
        this._query = "";
        this.whereArray = [];
        this.whereInArray = [];
        this.fromArray = [];
        this.joinArray = [];
        this.selectArray = [];
        this.orderByArray = [];
        this.groupByArray = [];
        this.insertIntoArray = [];
        this.valuesArray = [];
        this.valuesQArray = [];
    }
    select = (...columns) => {
        if (columns.length === 0) {
            this.selectArray.push("*");
        } else {
            for (let column of columns) {
                if (Array.isArray(column)) {
                    this.selectArray.push(`${column[0]} as "${column[1]}"`);
                } else if (typeof column === "string") {
                    this.selectArray.push(`${column}`);
                } else {
                    console.log("Invalid select input");
                }
            }
        }
        return this;
    };
    /* Input should be conditions in array. Format is [column, operator, value] by Markad */
    where = (...conditions) => {
        if (conditions.length === 0) {
            return;
        } else {
            for (let condition of conditions) {
                if (Array.isArray(condition)) {
                    this.whereArray.push(`${condition[0]} ${condition[1]} "${condition[2]}"`);
                } else {
                    console.log("Invalid where input");
                }
            }
        }
        return this;
    };
    values = (...values) => {
        for (let value of values) {
            this.valuesArray.push(value);
            this.valuesQArray.push("?");
        }
        return this;
    };
    insertInto = (...columns) => {
        for (let column of columns) {
            this.insertIntoArray.push(column);
        }
        return this;
    };
    set = (table) => {
        this._query = "";
        this._query += `INSERT INTO ${table} `;
        if (this.insertIntoArray.length > 0) {
            this._query += `(${this.insertIntoArray.join(", ")}) `;
        }
        this._query += `VALUES (${this.valuesQArray.join(", ")})`;
        let query = this._query,
            values = this.valuesArray;
        this.clear();
        return [query, values];
    };
    get = (table) => {
        this._query = "";
        if (this.selectArray.length !== 0) {
            this._query += `SELECT ${this.selectArray.join(", ")} `;
        } else {
            this._query += `SELECT * `;
        }
        if (this.fromArray.length !== 0) {
            this._query += `FROM ${this.fromArray.join(", ")}`;
        } else {
            this._query += `FROM ${table} `;
        }
        if (this.whereArray.length !== 0) {
            this._query += `WHERE ${this.whereArray.join(", ")}`;
        }
        if (this.groupByArray.length !== 0) {
            this._query += `GROUP BY ${this.groupByArray}`;
        }
        this.clear();
        return this._query;
    };
    clear = () => {
        this.whereArray = [];
        this.whereInArray = [];
        this.fromArray = [];
        this.joinArray = [];
        this.selectArray = [];
        this.orderByArray = [];
        this.groupByArray = [];
        this.insertIntoArray = [];
        this.valuesArray = [];
        this.valuesQArray = [];
    };
};
