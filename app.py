from flask import Flask, render_template, request, jsonify
import calendar
from datetime import datetime

app = Flask(__name__)

def generate_calendar(year, month):
    cal = calendar.monthcalendar(year, month)
    month_name = calendar.month_name[month]
    return cal, month_name

@app.route('/')
def show_calendar():
    year = request.args.get('year', datetime.now().year, type=int)
    month = request.args.get('month', datetime.now().month, type=int)
    
    cal, month_name = generate_calendar(year, month)
    month_names = list(calendar.month_name)[1:]
    
    return render_template('calendar.html', year=year, month=month, month_name=month_name, 
                           calendar=cal, month_names=month_names)

@app.route('/get_calendar')
def get_calendar():
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    
    cal, month_name = generate_calendar(year, month)
    
    return jsonify({
        'year': year,
        'month': month,
        'month_name': month_name,
        'calendar': cal
    })

if __name__ == '__main__':
    app.run(debug=True)