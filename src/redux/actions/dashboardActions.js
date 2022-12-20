import * as types from "../../constants";
import { getDashboardData as getDashboardDataService } from "../../services/dashboardService";

export function getDashboardData() {
  return async (dispatch) => {
    return getDashboardDataService()
      .then((response) => {
        dispatch({
          type: types.DASHBOARD_DATA,
          ...response,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}
