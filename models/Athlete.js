const Model = require("../system/core/Model");
module.exports = class User extends Model {
    constructor() {
        super();
    }
    getAthletesByParameter = async (res, params) => {
        await this.connectToPool();
        let whereArray = [],
            whereValuesArray = [];
        if (params.name.length !== 0) {
            whereArray.push([`UPPER(CONCAT(athletes.first_name,' ',athletes.last_name))`, "LIKE", "?"]);
            whereValuesArray.push(`%${params.name}%`);
        }
        if (params["gender"].length !== 0) {
            whereArray.push(["athletes.gender", "IN", "(?)"]);
            whereValuesArray.push(params.gender);
        }
        if (params["sports"].length !== 0) {
            whereArray.push(["sports.name", "IN", "(?)"]);
            whereValuesArray.push(params.sports);
        }
        const query = await this.qb
            .selectMod("DISTINCT")
            .select(
                "athletes.id",
                "athletes.gender",
                ["CONCAT(athletes.first_name,' ',athletes.last_name)", "name"],
                "athletes.image"
            )
            .join(
                ["INNER JOIN", "athlete_sport", "athletes.id", "athlete_sport.athlete_id"],
                ["INNER JOIN", "sports", "athlete_sport.sport_id", "sports.id"]
            )
            .where(...whereArray)
            .get("athletes");
        const [rows, fields] = await this.query(res, query, whereValuesArray);
        return rows;
    };
};
