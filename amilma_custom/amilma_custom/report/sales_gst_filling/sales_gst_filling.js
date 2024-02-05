// Copyright (c) 2024, Vivek and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Sales GST Filling"] = {
    "filters": [
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "reqd": 1,
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "reqd": 1,
        },
        {
            "fieldname": "company",
            "label": __("Company"),
            "fieldtype": "Link",
            "options": "Company",
            "onchange": function() {
                var company = frappe.query_report.get_filter_value("company");

                // Fetch the address_html value for the selected company
                frappe.call({
                    method: "frappe.client.get_value",
                    args: {
                        doctype: "Company",
                        filters: { "name": company },
                        fieldname: "address_html"
                    },
                    callback: function(response) {
                        if (response.message && response.message.address_html) {
                            frappe.query_report.set_filter_value("address_filter", response.message.address_html);

                            // Refresh the report to apply the new filter
                            frappe.query_report.refresh();
                        } else {
                            frappe.query_report.set_filter_value("address_filter", "");
                        }
                    }
                });
            }
        },
        {
            "fieldname": "address_filter",
            "label": __("Address"),
            "fieldtype": "Data",
            "hidden": 0,
        },
    ],
};
