var _ = require('underscore');

exports.extract_incident = function(_doc) {
  if(_doc) {
    return {
      'incident_name': _doc.incident_name || 'empty',
      'commander': _doc.commander || 'empty',
      'firefighters': _doc.firefighters || 'empty',
      'lt': _doc.lt || 0,
      'lg': _doc.lg || 0,
      'street': _doc.street || 'empty',
      'city': _doc.city || 'empty',
      'state': _doc.state || 'empty',
      'zip': _doc.zip || 'empty',
      'start_time': _doc.start_time || 'empty',
      'end_time': _doc.end_time || 'empty',
      'ts': _doc.ts || 'empty'
    };
  } else {
    return null;
  }
};

exports.extract_event = function(_doc) {
  if(_doc) {
    return {
      'user_n': _doc.user_n || 'empty',
      'r': _doc.r || 0,
      'tp': _doc.type || 0,
      'm': _doc.m|| 0,
      'lt': _doc.lt || 0,
      'lg': _doc.lg || 0,
      'ts': _doc.ts || 'empty',
      'tk': _doc.tk || 'empty'
    };
  } else {
    return null;
  }
};



exports.extract_user = function(_doc) {
  if(_doc) {
    return {
      'user_n': _doc.user_n || 'empty',
      'password': _doc.password || 'empty',
      'job_role': _doc.job_role || 'empty',
      'r': _doc.r || 0,
      'contact': _doc.contact || 'empty',
      'engine_name': _doc.engine_name || 0
    };
  } else {
    return null;
  }
};


exports.extract_engine = function(_doc) {
  if(_doc) {
    return {
      'engine_name': _doc.engine_name || 'empty',
      'hotspot_name': _doc.hotspot_name || 'empty'
    };
  } else {
    return null;
  }
};
