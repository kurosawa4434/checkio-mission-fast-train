//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        function fastTrainCanvas(dom, rails, runs) {
            const attr = {
                station: {
                    building: {
                        'stroke-width': 0,
                        'fill': '#006CA9',
                    },
                    clock: {
                        'stroke-width': 0,
                        'fill': 'white',
                    },
                    clock_hand: {
                        'stroke-width': 0.5,
                        'stroke': '#006CA9',
                    },
                },
                train: {
                    'body': {
                        'stroke-width': 0,
                        'fill': '#FABA00',
                    },
                    'window': {
                        'stroke-width': 0,
                        'fill': 'white',
                    },
                    'pantograph': {
                        'stroke-width': 0.5,
                        'stroke': 'FABA00',
                    },
                },
                line: {
                    scale: {
                        section: {
                            'stroke': '#6FB3DE',
                            'stroke': '#006CA9',
                            'stroke-width': 2,
                        },
                        rail: {
                            'stroke': '#6FB3DE',
                            'stroke': '#006CA9',
                            'stroke-width': 1,
                        },
                    },
                    run: {
                        'stroke': '#F0801A',
                        'stroke-width': 2,
                    },
                },
                text: {
                    input: {
                        'font-size': '10px',
                        'font-family': 'robot', 
                        'fill': '#006CA9',
                        'stroke-width': 0,
                        'text-anchor': 'middle',
                    },
                },
                circle: {
                    run_point: {
                        'stroke-width': 0,
                        'fill': '#F0801A',
                    }
                },
            };

            // canvas
            const os = 20;
            const paper = Raphael(dom, 250+(os*2), 100+(os*2), 0, 0);
            const rails_total = rails.reduce((a, b)=>a+b[0], 0);
            const RAIL = 250/rails_total;

            //rail (horizontal)
            paper.path('M' + os + ',' + 80 + 'l'
                + rails_total*RAIL + ',' + 0).attr(attr.line.scale.section);

            // stations
            station(os, 0);
            station(os + RAIL*rails_total, runs.length);

            //section scales
            paper.path('M' + os + ',' + 70 + 'l0' + ',' + 20).attr(
                attr.line.scale.section);

            let sub_total = 0;
            rails.forEach(r=>{
                const dist = r[0];
                paper.path('M' + (RAIL*dist + os + sub_total) + ',' + 70
                    + ' l0' + ',' + 20).attr(attr.line.scale.section); 
                sub_total += RAIL*dist;
            });

            //rail scales
            let dist_sub_total = 0;
            rails.forEach(r=>{
                const dist = r[0];
                for (let d=1; d < dist; d += 1) { 
                    paper.path('M' + (RAIL*d + os + dist_sub_total) + ',' 
                        + 75
                        + ' l0' + ',' + 10).attr(attr.line.scale.rail); 
                }
                dist_sub_total += RAIL*dist;
            });

            // train
            const tr = train(os);

            // input values text
            let rail_total = 0;
            rails.forEach(r=>{
                const [dist, limit] = r; 
                paper.text(os + (dist*RAIL/2) + rail_total, 100, 
                    '(' + dist + ',' + limit + ')' ).attr(attr.text.input);
                rail_total += dist*RAIL;
            });

            // run (prepare)
            let run_total = 0;
            const run_set = paper.set();
            runs.forEach(r=>{
                run_set.push(
                    paper.path('M'+ (run_total*RAIL+os) + ',' + 80)).attr(
                        attr.line.run);
                run_total += r;
            });

            // running
            draw_line();

            /*----------------------------------------------*
             *
             * running
             *
             *----------------------------------------------*/
            function draw_line() {

                let i = 0;
                const sum = x=>x.reduce((a, b)=>a+b, 0);

                (function fn2(){
                    const circle_x = sum(runs.slice(0, i))*RAIL;
                    const run_x = sum(runs.slice(0, i+1))*RAIL;

                    if (i > 0)
                        paper.circle(circle_x+os, 80, 3).attr(
                            attr.circle.run_point);

                    if (i === runs.length)
                        return

                    tr.animate({'transform': "t " + run_x + "," + 0}, 300);
                    run_set[i].animate(
                        {'path': run_set[i].attrs.path.join(',')
                        + ' l' + runs[i]*RAIL + ',' + 0},
                        300, fn2).attr(attr.line.run);

                    i += 1;
                })();
            }

            /*----------------------------------------------*
             *
             * station
             *
             *----------------------------------------------*/
            function station(sx, mi) {

                // roof
                paper.path('M' + sx + ',' + 55 +
                 'l' + 5 + ',' + 5 +
                 'l' + (-10) + ',' + 0 + 'Z').attr(attr.station.building);   
                // rect
                paper.rect(sx-5, (55+5), 10, 20).attr(
                    attr.station.building);
                paper.rect(sx-10, (55+12), 20, 13).attr(
                    attr.station.building);

                // clock
                paper.circle(sx, (55+8), 2.5).attr(attr.station.clock);
                paper.path('M' + sx + ',' + (55+8) +
                 ' l' + (0) + ',' + (-2.5) + 'Z').attr(
                     attr.station.clock_hand);   

                paper.path('M' + sx + ',' + (55+8) +
                 ' l' + (Math.cos(Math.PI*2*((mi-15)/60))*2.5) + ',' 
                      + (Math.sin(Math.PI*2*((mi-15))/60)*2.5) + 'Z').attr(
                    attr.station.clock_hand);   
            }

            /*----------------------------------------------*
             *
             * train
             *
             *----------------------------------------------*/
            function train(sx) {
                const t = paper.set();

                t.push(paper.rect(sx-12, 71.5, 24, 8, 2).attr(
                    attr.train.body));

                for(let i=0; i < 5; i += 1)
                    t.push(paper.rect(sx-9.4+(i*4), 73.5, 2.5, 3, 0.7).attr(
                        attr.train.window));

                t.push(paper.path('M' + (sx+4) + ',' + 68
                    + ' l' + 2 + ',' + 2
                    + ' l' + -2 + ',' + 2).attr(attr.train.pantograph));

                return t;
            }
        }

        var $tryit;
        var io = new extIO({
            multipleArguments: false,
            functions: {
                js: 'fastTran',
                python: 'fast_train'
            },
            animation: function($expl, data){
                fastTrainCanvas(
                    $expl[0],
                    data.in,
                    data.ext.explanation
                );
            }
        });
        io.start();
    }
);
