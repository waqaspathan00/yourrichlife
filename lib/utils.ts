import {DailySavingsBalance, Goal, ViewKey} from "@/lib/types";
import {updateSavingsDoc} from "@/lib/firebase";
import toast from "react-hot-toast";

export const mockDailySavingsBalance = [
    {
        "date": "3/2/2023",
        "amount": 5000
    },
    {
        "date": "3/3/2023",
        "amount": 5000
    },
    {
        "date": "3/4/2023",
        "amount": 5000
    },
    {
        "date": "3/5/2023",
        "amount": 5000
    },
    {
        "date": "3/6/2023",
        "amount": 5000
    },
    {
        "date": "3/7/2023",
        "amount": 5000
    },
    {
        "date": "3/8/2023",
        "amount": 5000
    },
    {
        "date": "3/9/2023",
        "amount": 5000
    },
    {
        "date": "3/10/2023",
        "amount": 5000
    },
    {
        "date": "3/11/2023",
        "amount": 5000
    },
    {
        "date": "3/12/2023",
        "amount": 5000
    },
    {
        "date": "3/13/2023",
        "amount": 5000
    },
    {
        "date": "3/14/2023",
        "amount": 5000
    },
    {
        "date": "3/15/2023",
        "amount": 5000
    },
    {
        "date": "3/16/2023",
        "amount": 5000
    },
    {
        "date": "3/17/2023",
        "amount": 5000
    },
    {
        "date": "3/18/2023",
        "amount": 5000
    },
    {
        "date": "3/19/2023",
        "amount": 5000
    },
    {
        "date": "3/20/2023",
        "amount": 5000
    },
    {
        "date": "3/21/2023",
        "amount": 5000
    },
    {
        "date": "3/22/2023",
        "amount": 5000
    },
    {
        "date": "3/23/2023",
        "amount": 5000
    },
    {
        "date": "3/24/2023",
        "amount": 5000
    },
    {
        "date": "3/25/2023",
        "amount": 5000
    },
    {
        "date": "3/26/2023",
        "amount": 5000
    },
    {
        "date": "3/27/2023",
        "amount": 5000
    },
    {
        "date": "3/28/2023",
        "amount": 5000
    },
    {
        "date": "3/29/2023",
        "amount": 5000
    },
    {
        "date": "3/30/2023",
        "amount": 5000
    },
    {
        "date": "3/31/2023",
        "amount": 5000
    },
    {
        "date": "4/1/2023",
        "amount": 5000
    },
    {
        "date": "4/2/2023",
        "amount": 5000
    },
    {
        "date": "4/3/2023",
        "amount": 2500
    },
    {
        "date": "4/4/2023",
        "amount": 2500
    },
    {
        "date": "4/5/2023",
        "amount": 2500
    },
    {
        "date": "4/6/2023",
        "amount": 2500
    },
    {
        "date": "4/7/2023",
        "amount": 2500
    },
    {
        "date": "4/8/2023",
        "amount": 2500
    },
    {
        "date": "4/9/2023",
        "amount": 2500
    },
    {
        "date": "4/10/2023",
        "amount": 2500
    },
    {
        "date": "4/11/2023",
        "amount": 2500
    },
    {
        "date": "4/12/2023",
        "amount": 2500
    },
    {
        "date": "4/13/2023",
        "amount": 2500
    },
    {
        "date": "4/14/2023",
        "amount": 2500
    },
    {
        "date": "4/15/2023",
        "amount": 2500
    },
    {
        "date": "4/16/2023",
        "amount": 2500
    },
    {
        "date": "4/17/2023",
        "amount": 2500
    },
    {
        "date": "4/18/2023",
        "amount": 2500
    },
    {
        "date": "4/19/2023",
        "amount": 2500
    },
    {
        "date": "4/20/2023",
        "amount": 2500
    },
    {
        "date": "4/21/2023",
        "amount": 2500
    },
    {
        "date": "4/22/2023",
        "amount": 2500
    },
    {
        "date": "4/23/2023",
        "amount": 2500
    },
    {
        "date": "4/24/2023",
        "amount": 2500
    },
    {
        "date": "4/25/2023",
        "amount": 2500
    },
    {
        "date": "4/26/2023",
        "amount": 2500
    },
    {
        "date": "4/27/2023",
        "amount": 2500
    },
    {
        "date": "4/28/2023",
        "amount": 2500
    },
    {
        "date": "4/29/2023",
        "amount": 2500
    },
    {
        "date": "4/30/2023",
        "amount": 2500
    },
    {
        "date": "5/1/2023",
        "amount": 2500
    },
    {
        "date": "5/2/2023",
        "amount": 4000
    },
    {
        "date": "5/3/2023",
        "amount": 4000
    },
    {
        "date": "5/4/2023",
        "amount": 4000
    },
    {
        "date": "5/5/2023",
        "amount": 4000
    },
    {
        "date": "5/6/2023",
        "amount": 4000
    },
    {
        "date": "5/7/2023",
        "amount": 4000
    },
    {
        "date": "5/8/2023",
        "amount": 4000
    },
    {
        "date": "5/9/2023",
        "amount": 4000
    },
    {
        "date": "5/10/2023",
        "amount": 4000
    },
    {
        "date": "5/11/2023",
        "amount": 4000
    },
    {
        "date": "5/12/2023",
        "amount": 4000
    },
    {
        "date": "5/13/2023",
        "amount": 4000
    },
    {
        "date": "5/14/2023",
        "amount": 4000
    },
    {
        "date": "5/15/2023",
        "amount": 4000
    },
    {
        "date": "5/16/2023",
        "amount": 4000
    },
    {
        "date": "5/17/2023",
        "amount": 4000
    },
    {
        "date": "5/18/2023",
        "amount": 4000
    },
    {
        "date": "5/19/2023",
        "amount": 4000
    },
    {
        "date": "5/20/2023",
        "amount": 4000
    },
    {
        "date": "5/21/2023",
        "amount": 4000
    },
    {
        "date": "5/22/2023",
        "amount": 4000
    },
    {
        "date": "5/23/2023",
        "amount": 4000
    },
    {
        "date": "5/24/2023",
        "amount": 4000
    },
    {
        "date": "5/25/2023",
        "amount": 4000
    },
    {
        "date": "5/26/2023",
        "amount": 4000
    },
    {
        "date": "5/27/2023",
        "amount": 4000
    },
    {
        "date": "5/28/2023",
        "amount": 4000
    },
    {
        "date": "5/29/2023",
        "amount": 3000
    },
    {
        "date": "5/30/2023",
        "amount": 3000
    },
    {
        "date": "5/31/2023",
        "amount": 1000
    },
    {
        "date": "6/1/2023",
        "amount": 1000
    },
    {
        "date": "6/2/2023",
        "amount": 1000
    },
    {
        "date": "6/3/2023",
        "amount": 1000
    },
    {
        "date": "6/4/2023",
        "amount": 4000
    },
    {
        "date": "6/5/2023",
        "amount": 4000
    },
    {
        "date": "6/6/2023",
        "amount": 4000
    },
    {
        "date": "6/7/2023",
        "amount": 4000
    },
    {
        "date": "6/8/2023",
        "amount": 4000
    },
    {
        "date": "6/9/2023",
        "amount": 4000
    },
    {
        "date": "6/10/2023",
        "amount": 4000
    },
    {
        "date": "6/11/2023",
        "amount": 4000
    },
    {
        "date": "6/12/2023",
        "amount": 4000
    },
    {
        "date": "6/13/2023",
        "amount": 4000
    },
    {
        "date": "6/14/2023",
        "amount": 4000
    },
    {
        "date": "6/15/2023",
        "amount": 3000
    },
    {
        "date": "6/16/2023",
        "amount": 3000
    },
    {
        "date": "6/17/2023",
        "amount": 3000
    },
    {
        "date": "6/18/2023",
        "amount": 3000
    },
    {
        "date": "6/19/2023",
        "amount": 3000
    },
    {
        "date": "6/20/2023",
        "amount": 3000
    },
    {
        "date": "6/21/2023",
        "amount": 3000
    },
    {
        "date": "6/22/2023",
        "amount": 3000
    },
    {
        "date": "6/23/2023",
        "amount": 3000
    },
    {
        "date": "6/24/2023",
        "amount": 3000
    },
    {
        "date": "6/25/2023",
        "amount": 3000
    },
    {
        "date": "6/26/2023",
        "amount": 3000
    },
    {
        "date": "6/27/2023",
        "amount": 3000
    },
    {
        "date": "6/28/2023",
        "amount": 3000
    },
    {
        "date": "6/29/2023",
        "amount": 3000
    },
    {
        "date": "6/30/2023",
        "amount": 3000
    },
    {
        "date": "7/1/2023",
        "amount": 3000
    },
    {
        "date": "7/2/2023",
        "amount": 3000
    },
    {
        "date": "7/3/2023",
        "amount": 3000
    },
    {
        "date": "7/4/2023",
        "amount": 3000
    },
    {
        "date": "7/5/2023",
        "amount": 1000
    },
    {
        "date": "7/6/2023",
        "amount": 1000
    },
    {
        "date": "7/7/2023",
        "amount": 1000
    },
    {
        "date": "7/8/2023",
        "amount": 1000
    },
    {
        "date": "7/9/2023",
        "amount": 1000
    },
    {
        "date": "7/10/2023",
        "amount": 1000
    },
    {
        "date": "7/11/2023",
        "amount": 1000
    },
    {
        "date": "7/12/2023",
        "amount": 1000
    },
    {
        "date": "7/13/2023",
        "amount": 1000
    },
    {
        "date": "7/14/2023",
        "amount": 1000
    },
    {
        "date": "7/15/2023",
        "amount": 1000
    },
    {
        "date": "7/16/2023",
        "amount": 1000
    },
    {
        "date": "7/17/2023",
        "amount": 1000
    },
    {
        "date": "7/18/2023",
        "amount": 1000
    },
    {
        "date": "7/19/2023",
        "amount": 1000
    },
    {
        "date": "7/20/2023",
        "amount": 1000
    },
    {
        "date": "7/21/2023",
        "amount": 1000
    },
    {
        "date": "7/22/2023",
        "amount": 1000
    },
    {
        "date": "7/23/2023",
        "amount": 1000
    },
    {
        "date": "7/24/2023",
        "amount": 1000
    },
    {
        "date": "7/25/2023",
        "amount": 1000
    },
    {
        "date": "7/26/2023",
        "amount": 1000
    },
    {
        "date": "7/27/2023",
        "amount": 1000
    },
    {
        "date": "7/28/2023",
        "amount": 1000
    },
    {
        "date": "7/29/2023",
        "amount": 1000
    },
    {
        "date": "7/30/2023",
        "amount": 1000
    },
    {
        "date": "7/31/2023",
        "amount": 1000
    },
    {
        "date": "8/1/2023",
        "amount": 1000
    },
    {
        "date": "8/2/2023",
        "amount": 1000
    },
    {
        "date": "8/3/2023",
        "amount": 1000
    },
    {
        "date": "8/4/2023",
        "amount": 1000
    },
    {
        "date": "8/5/2023",
        "amount": 1000
    },
    {
        "date": "8/6/2023",
        "amount": 1000
    },
    {
        "date": "8/7/2023",
        "amount": 1000
    },
    {
        "date": "8/8/2023",
        "amount": 1000
    },
    {
        "date": "8/9/2023",
        "amount": 1000
    },
    {
        "date": "8/10/2023",
        "amount": 1000
    },
    {
        "date": "8/11/2023",
        "amount": 1000
    },
    {
        "date": "8/12/2023",
        "amount": 1000
    },
    {
        "date": "8/13/2023",
        "amount": 1000
    },
    {
        "date": "8/14/2023",
        "amount": 1000
    },
    {
        "date": "8/15/2023",
        "amount": 1000
    },
    {
        "date": "8/16/2023",
        "amount": 1000
    },
    {
        "date": "8/17/2023",
        "amount": 1000
    },
    {
        "date": "8/18/2023",
        "amount": 1000
    },
    {
        "date": "8/19/2023",
        "amount": 1000
    },
    {
        "date": "8/20/2023",
        "amount": 1000
    },
    {
        "date": "8/21/2023",
        "amount": 1000
    },
    {
        "date": "8/22/2023",
        "amount": 1000
    },
    {
        "date": "8/23/2023",
        "amount": 1000
    },
    {
        "date": "8/24/2023",
        "amount": 1000
    },
    {
        "date": "8/25/2023",
        "amount": 1000
    },
    {
        "date": "8/26/2023",
        "amount": 1000
    },
    {
        "date": "8/27/2023",
        "amount": 1000
    },
    {
        "date": "8/28/2023",
        "amount": 1000
    },
    {
        "date": "8/29/2023",
        "amount": 1000
    },
    {
        "date": "8/30/2023",
        "amount": 1000
    },
    {
        "date": "8/31/2023",
        "amount": 1000
    },
    {
        "date": "9/1/2023",
        "amount": 1000
    },
    {
        "date": "9/2/2023",
        "amount": 1000
    },
    {
        "date": "9/3/2023",
        "amount": 1000
    },
    {
        "date": "9/4/2023",
        "amount": 1000
    },
    {
        "date": "9/5/2023",
        "amount": 1000
    },
    {
        "date": "9/6/2023",
        "amount": 1000
    },
    {
        "date": "9/7/2023",
        "amount": 1000
    },
    {
        "date": "9/8/2023",
        "amount": 1000
    },
    {
        "date": "9/9/2023",
        "amount": 1000
    },
    {
        "date": "9/10/2023",
        "amount": 1000
    },
    {
        "date": "9/11/2023",
        "amount": 1000
    },
    {
        "date": "9/12/2023",
        "amount": 1000
    },
    {
        "date": "9/13/2023",
        "amount": 1000
    },
    {
        "date": "9/14/2023",
        "amount": 1000
    },
    {
        "date": "9/15/2023",
        "amount": 1000
    },
    {
        "date": "9/16/2023",
        "amount": 1000
    },
    {
        "date": "9/17/2023",
        "amount": 1000
    },
    {
        "date": "9/18/2023",
        "amount": 1000
    },
    {
        "date": "9/19/2023",
        "amount": 1000
    },
    {
        "date": "9/20/2023",
        "amount": 1000
    },
    {
        "date": "9/21/2023",
        "amount": 1000
    },
    {
        "date": "9/22/2023",
        "amount": 1000
    },
    {
        "date": "9/23/2023",
        "amount": 1000
    },
    {
        "date": "9/24/2023",
        "amount": 1000
    },
    {
        "date": "9/25/2023",
        "amount": 1000
    },
    {
        "date": "9/26/2023",
        "amount": 1000
    },
    {
        "date": "9/27/2023",
        "amount": 1000
    },
    {
        "date": "9/28/2023",
        "amount": 1000
    },
    {
        "date": "9/29/2023",
        "amount": 1000
    },
    {
        "date": "9/30/2023",
        "amount": 1000
    },
    {
        "date": "10/1/2023",
        "amount": 1000
    },
    {
        "date": "10/2/2023",
        "amount": 1000
    },
    {
        "date": "10/3/2023",
        "amount": 5000
    },
    {
        "date": "10/4/2023",
        "amount": 5000
    },
    {
        "date": "10/5/2023",
        "amount": 5000
    },
    {
        "date": "10/6/2023",
        "amount": 5000
    },
    {
        "date": "10/7/2023",
        "amount": 5000
    },
    {
        "date": "10/8/2023",
        "amount": 5000
    },
    {
        "date": "10/9/2023",
        "amount": 5000
    },
    {
        "date": "10/10/2023",
        "amount": 5000
    },
    {
        "date": "10/11/2023",
        "amount": 5000
    },
    {
        "date": "10/12/2023",
        "amount": 5000
    },
    {
        "date": "10/13/2023",
        "amount": 5000
    },
    {
        "date": "10/14/2023",
        "amount": 5000
    },
    {
        "date": "10/15/2023",
        "amount": 1900
    },
    {
        "date": "10/16/2023",
        "amount": 1900
    },
    {
        "date": "10/17/2023",
        "amount": 1900
    },
    {
        "date": "10/18/2023",
        "amount": 1900
    },
    {
        "date": "10/19/2023",
        "amount": 1900
    },
    {
        "date": "10/20/2023",
        "amount": 1900
    },
    {
        "date": "10/21/2023",
        "amount": 1900
    },
    {
        "date": "10/22/2023",
        "amount": 1900
    },
    {
        "date": "10/23/2023",
        "amount": 1900
    },
    {
        "date": "10/24/2023",
        "amount": 1900
    },
    {
        "date": "10/25/2023",
        "amount": 1900
    },
    {
        "date": "10/26/2023",
        "amount": 1900
    },
    {
        "date": "10/27/2023",
        "amount": 1900
    },
    {
        "date": "10/28/2023",
        "amount": 1900
    },
    {
        "date": "10/29/2023",
        "amount": 1900
    },
    {
        "date": "10/30/2023",
        "amount": 1900
    },
    {
        "date": "10/31/2023",
        "amount": 1500
    },
    {
        "date": "11/1/2023",
        "amount": 1500
    },
    {
        "date": "11/2/2023",
        "amount": 1500
    },
    {
        "date": "11/3/2023",
        "amount": 1500
    },
    {
        "date": "11/4/2023",
        "amount": 1500
    },
    {
        "date": "11/5/2023",
        "amount": 1500
    },
    {
        "date": "11/6/2023",
        "amount": 1500
    },
    {
        "date": "11/7/2023",
        "amount": 1500
    },
    {
        "date": "11/8/2023",
        "amount": 1500
    },
    {
        "date": "11/9/2023",
        "amount": 1500
    },
    {
        "date": "11/10/2023",
        "amount": 1500
    },
    {
        "date": "11/11/2023",
        "amount": 1500
    },
    {
        "date": "11/12/2023",
        "amount": 1500
    },
    {
        "date": "11/13/2023",
        "amount": 1500
    },
    {
        "date": "11/14/2023",
        "amount": 1500
    },
    {
        "date": "11/15/2023",
        "amount": 1500
    },
    {
        "date": "11/16/2023",
        "amount": 1500
    },
    {
        "date": "11/17/2023",
        "amount": 1500
    },
    {
        "date": "11/18/2023",
        "amount": 1500
    },
    {
        "date": "11/19/2023",
        "amount": 1500
    },
    {
        "date": "11/20/2023",
        "amount": 1500
    },
    {
        "date": "11/21/2023",
        "amount": 1500
    },
    {
        "date": "11/22/2023",
        "amount": 1500
    },
    {
        "date": "11/23/2023",
        "amount": 1500
    },
    {
        "date": "11/24/2023",
        "amount": 1500
    },
    {
        "date": "11/25/2023",
        "amount": 1500
    },
    {
        "date": "11/26/2023",
        "amount": 1500
    },
    {
        "date": "11/27/2023",
        "amount": 1500
    },
    {
        "date": "11/28/2023",
        "amount": 1500
    },
    {
        "date": "11/29/2023",
        "amount": 1500
    },
    {
        "date": "11/30/2023",
        "amount": 1500
    },
    {
        "date": "12/1/2023",
        "amount": 1500
    },
    {
        "date": "12/2/2023",
        "amount": 1500
    },
    {
        "date": "12/3/2023",
        "amount": 1500
    },
    {
        "date": "12/4/2023",
        "amount": 1500
    },
    {
        "date": "12/5/2023",
        "amount": 1500
    },
    {
        "date": "12/6/2023",
        "amount": 1500
    },
    {
        "date": "12/7/2023",
        "amount": 1500
    },
    {
        "date": "12/8/2023",
        "amount": 1500
    },
    {
        "date": "12/9/2023",
        "amount": 1500
    },
    {
        "date": "12/10/2023",
        "amount": 1500
    },
    {
        "date": "12/11/2023",
        "amount": 1500
    },
    {
        "date": "12/12/2023",
        "amount": 1500
    },
    {
        "date": "12/13/2023",
        "amount": 1500
    },
    {
        "date": "12/14/2023",
        "amount": 1500
    },
    {
        "date": "12/15/2023",
        "amount": 1500
    },
    {
        "date": "12/16/2023",
        "amount": 1500
    },
    {
        "date": "12/17/2023",
        "amount": 1500
    },
    {
        "date": "12/18/2023",
        "amount": 1500
    },
    {
        "date": "12/19/2023",
        "amount": 1500
    },
    {
        "date": "12/20/2023",
        "amount": 1500
    },
    {
        "date": "12/21/2023",
        "amount": 1500
    },
    {
        "date": "12/22/2023",
        "amount": 1500
    },
    {
        "date": "12/23/2023",
        "amount": 1500
    },
    {
        "date": "12/24/2023",
        "amount": 1500
    },
    {
        "date": "12/25/2023",
        "amount": 2000
    },
    {
        "date": "12/26/2023",
        "amount": 2000
    },
    {
        "date": "12/27/2023",
        "amount": 2000
    },
    {
        "date": "12/28/2023",
        "amount": 2000
    },
    {
        "date": "12/29/2023",
        "amount": 2000
    },
    {
        "date": "12/30/2023",
        "amount": 2000
    },
    {
        "date": "12/31/2023",
        "amount": 2000
    },
    {
        "date": "1/1/2024",
        "amount": 2000
    },
    {
        "date": "1/2/2024",
        "amount": 2000
    },
    {
        "date": "1/3/2024",
        "amount": 2000
    },
    {
        "date": "1/4/2024",
        "amount": 2000
    },
    {
        "date": "1/5/2024",
        "amount": 2000
    },
    {
        "date": "1/6/2024",
        "amount": 2000
    },
    {
        "date": "1/7/2024",
        "amount": 2000
    },
    {
        "date": "1/8/2024",
        "amount": 2000
    },
    {
        "date": "1/9/2024",
        "amount": 2000
    },
    {
        "date": "1/10/2024",
        "amount": 2000
    },
    {
        "date": "1/11/2024",
        "amount": 2000
    },
    {
        "date": "1/12/2024",
        "amount": 2000
    },
    {
        "date": "1/13/2024",
        "amount": 2000
    },
    {
        "date": "1/14/2024",
        "amount": 2000
    },
    {
        "date": "1/15/2024",
        "amount": 2000
    },
    {
        "date": "1/16/2024",
        "amount": 2000
    },
    {
        "date": "1/17/2024",
        "amount": 2000
    },
    {
        "date": "1/18/2024",
        "amount": 2000
    },
    {
        "date": "1/19/2024",
        "amount": 2000
    },
    {
        "date": "1/20/2024",
        "amount": 2000
    },
    {
        "date": "1/21/2024",
        "amount": 2000
    },
    {
        "date": "1/22/2024",
        "amount": 2000
    },
    {
        "date": "1/23/2024",
        "amount": 2500
    },
    {
        "date": "1/24/2024",
        "amount": 2500
    },
    {
        "date": "1/25/2024",
        "amount": 2500
    },
    {
        "date": "1/26/2024",
        "amount": 2500
    },
    {
        "date": "1/27/2024",
        "amount": 2750
    },
    {
        "date": "1/28/2024",
        "amount": 2750
    },
    {
        "date": "1/29/2024",
        "amount": 2750
    },
    {
        "date": "1/30/2024",
        "amount": 2750
    },
    {
        "date": "1/31/2024",
        "amount": 6250
    },
    {
        "date": "2/1/2024",
        "amount": 6250
    },
    {
        "date": "2/2/2024",
        "amount": 6250
    },
    {
        "date": "2/3/2024",
        "amount": 6250
    },
    {
        "date": "2/4/2024",
        "amount": 6250
    },
    {
        "date": "2/5/2024",
        "amount": 6250
    },
    {
        "date": "2/6/2024",
        "amount": 6250
    },
    {
        "date": "2/7/2024",
        "amount": 6250
    },
    {
        "date": "2/8/2024",
        "amount": 6250
    },
    {
        "date": "2/9/2024",
        "amount": 6250
    },
    {
        "date": "2/10/2024",
        "amount": 6250
    },
    {
        "date": "2/11/2024",
        "amount": 6250
    },
    {
        "date": "2/12/2024",
        "amount": 6250
    },
    {
        "date": "2/13/2024",
        "amount": 6250
    },
    {
        "date": "2/14/2024",
        "amount": 6250
    },
    {
        "date": "2/15/2024",
        "amount": 7000
    },
    {
        "date": "2/16/2024",
        "amount": 7000
    },
    {
        "date": "2/17/2024",
        "amount": 7000
    },
    {
        "date": "2/18/2024",
        "amount": 7000
    },
    {
        "date": "2/19/2024",
        "amount": 7000
    },
    {
        "date": "2/20/2024",
        "amount": 7000
    },
    {
        "date": "2/21/2024",
        "amount": 7000
    },
    {
        "date": "2/22/2024",
        "amount": 7000
    },
    {
        "date": "2/23/2024",
        "amount": 7000
    },
    {
        "date": "2/24/2024",
        "amount": 7000
    },
    {
        "date": "2/25/2024",
        "amount": 7000
    },
    {
        "date": "2/26/2024",
        "amount": 7000
    },
    {
        "date": "2/27/2024",
        "amount": 6000
    },
    {
        "date": "2/28/2024",
        "amount": 6000
    },
    {
        "date": "2/29/2024",
        "amount": 6000
    },
    {
        "date": "3/1/2024",
        "amount": 6000
    },
]

export const getRandomEmoji = () => {
    const thingEmojis = [
        '⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️',
        '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️',
        '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️',
        '🧭', '🔋', '🔌', '💡', '🔦', '🕯️', '🧯', '🛢️', '💸', '💵',
        '💴', '💶', '💷', '💰', '💳', '🧾', '💎', '⚖️', '🔧', '🔨',
        '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '⛓️', '🧰', '🔫', '💣', '🔪',
        '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '🪦', '🚿', '🛁', '🪒', '🧴',
        '🧷', '🧹', '🧺', '🧻', '🧼', '🧽', '🧯', '🛎️', '🔑', '🗝️',
        '🚪', '🛋️', '🪑', '🚽', '🚿', '🛁', '🪒', '🧴', '🧷', '🧹'
    ];

    const randomIndex = Math.floor(Math.random() * thingEmojis.length);
    return thingEmojis[randomIndex];
}

export const getNumberOfDaysPassedInYear = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const diff = today.getTime() - firstDayOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day + 1;
}

/**
 * Calculates the amount of funds that have not been distributed to any savings goals
 * formula: currentSavingsAmount - sum of all amountSaved in fetchedSavingsGoals
 *
 * @param currentSavingsAmount - the current amount of savings
 * @param fetchedSavingsGoals - the savings goals fetched from the database
 */
export const calculateUndistributedFunds = (currentSavingsAmount: number, fetchedSavingsGoals: Goal[]) => {
    return currentSavingsAmount - fetchedSavingsGoals.reduce((acc: number, goal: Goal) => acc + goal.amountSaved, 0);
}

export const distributeFundsToGoals = (amountToDistribute: number, percentage: number, priorityGoal: string, fetchedSavingsGoals: Goal[]) => {
    let totalAmountToDistribute = amountToDistribute
    const priorityPercentage = percentage / 100;
    const priorityDistributionAmount = totalAmountToDistribute * priorityPercentage;
    const postPriorityDistributionAmount = totalAmountToDistribute - priorityDistributionAmount;

    const numNonPriorityGoals = fetchedSavingsGoals
        .filter((goal: Goal) => goal.name !== priorityGoal)
        .filter((goal: Goal) => goal.amountSaved < goal.amountTarget)
        .length;
    const amountPerGoal = Math.round(postPriorityDistributionAmount / numNonPriorityGoals * 100) / 100;
    const updatedSavingsGoals = fetchedSavingsGoals.map((goal: Goal) => {
        if (goal.name === priorityGoal) {
            if (goal.amountSaved + priorityDistributionAmount > goal.amountTarget) {
                totalAmountToDistribute -= (goal.amountTarget - goal.amountSaved);
                return {...goal, amountSaved: goal.amountTarget};
            }
            totalAmountToDistribute -= priorityDistributionAmount;
            return {...goal, amountSaved: goal.amountSaved + priorityDistributionAmount};
        } else {
            if (goal.amountSaved + amountPerGoal > goal.amountTarget) {
                totalAmountToDistribute -= (goal.amountTarget - goal.amountSaved);
                return {...goal, amountSaved: goal.amountTarget};
            }
            totalAmountToDistribute -= amountPerGoal;
            return {...goal, amountSaved: goal.amountSaved + amountPerGoal};
        }
    });

    return {remainingFundsToDistribute: totalAmountToDistribute, updatedSavingsGoals};
}

/**
 * Adds a new day to the dailySavingsBalance array based on 3 conditions:
 *  - if the user has not signed in before
 *  - when the last sign in date is not today
 *  - when the date of the last element in the array is not today
 *
 * @param fetchedDailySavingsBalance
 */
export const addNewDayToSavingsBalance = (fetchedDailySavingsBalance: DailySavingsBalance[]) => {
    const lastElement = fetchedDailySavingsBalance[fetchedDailySavingsBalance.length - 1];
    const lastSavingsDate = lastElement.date;
    const lastSavingsAmount = lastElement.amount;
    const dateLastSignedIn = localStorage.getItem("dateLastSignedIn");

    const TODAY = new Date().toLocaleDateString();
    if (!dateLastSignedIn || dateLastSignedIn !== TODAY || lastSavingsDate !== TODAY) {
        // toast.success(`adding a new day", "dateLastSignedIn", ${dateLastSignedIn}, "TODAY", ${TODAY}`)
        const newElement = {
            date: TODAY,
            amount: lastSavingsAmount
        }
        fetchedDailySavingsBalance.push(newElement);

        if (fetchedDailySavingsBalance.length > 365) {
            fetchedDailySavingsBalance.shift();
        }
        updateSavingsDoc({dailySavingsBalance: fetchedDailySavingsBalance})
    }

    localStorage.setItem("dateLastSignedIn", TODAY);
}

export function updateGoals<T extends keyof Goal>(savingsGoals: Goal[], goalId: number, key: T, value: Goal[T]): Goal[] {
    return savingsGoals.map((savingsGoal) => {
        if (savingsGoal.id === goalId) {
            savingsGoal[key] = value;
        }
        return savingsGoal;
    });
}

export const transformChartData = (data: any, view: ViewKey) => {
    if (view === 'YTD') {
        return data.slice(data.length - getNumberOfDaysPassedInYear());
    } else {
        const days = viewToDaysMap[view];
        return data.slice(data.length - days)
    }
}

export const setDataToLocalStorage = (savingsDataObj: any) => {
    localStorage.setItem("savingsData", JSON.stringify(savingsDataObj));
}

export const updateDataInLocalStorage = (key: string, value: any) => {
    const savingsData = JSON.parse(localStorage.getItem("savingsData")!);
    savingsData[key] = value;
    localStorage.setItem("savingsData", JSON.stringify(savingsData));
}

export const generateId = () => {
    return Math.floor(Math.random() * 1000000);
}

export const viewToDaysMap = {
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
};