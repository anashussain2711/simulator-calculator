export const getData = () => {
    // var item1 = { content: "My summary task" };
    var item1 = {
        content: "My task 1",
        start: new Date(2012, 8, 1, 8, 0, 0),
        finish: new Date(2012, 8, 3, 16, 0, 0),
    };
    var item2 = {
        content: "My task 2",
        start: new Date(2012, 8, 4, 8, 0, 0),
        finish: new Date(2012, 8, 5, 8, 0, 0),
    };
    var item3 = {
        content: "My task 3",
        start: new Date(2012, 8, 5, 8, 0, 0),
        finish: new Date(2012, 8, 8, 16, 0, 0),
    };
    var items = [item1, item2,item3];
    var settings = { currentTime: new Date(2012, 8, 2, 12, 0, 0) };
    return {items,settings}
};
