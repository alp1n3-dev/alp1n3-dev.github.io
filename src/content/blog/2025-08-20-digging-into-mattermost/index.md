---
title: digging into mattermost
date: 2025-08-20
tags:
  - "#appsec"
  - "#cve"
  - "#recon"
draft: true
---
*From Day Zero to Zero Day* by Eugene Lim has been an awesome read so far, and as I dive further into it I'd like to document my progress. Starting at the beginning, we're instructed on how to choose a target. The easiest road is going full white-box, especially for a beginner, so I've picked Mattermost. 

It:
- has the source code available.
- is easy to setup via Docker.
- has file uploads, different user permissions, and more to look at.
- is essentially a web application, which is up my alley.

Of course there's lots of tools I could use with Burp Pro, but I'm doing this on my own time with my own laptop, which leaves me with Community Edition, so I'll be using alternative tools in place of things like Intruder or Burp Pro extensions.

---

## recon - tracking endpoints

### stroll through the app with an active proxy


### api documents


### standard documents

#### deployment documentation


#### administration documentation


### finding endpoint patterns via the source code


### crawling with katana


### brute force with ffuf
> [!info] To ensure this is effective and easy to parse, make sure to define "failure" response contents, sizes, and status codes, in order to filter them out.


### manually reviewing the site, along with the individual html & js files

#### with wappalyzer


#### with a bookmarklet (feat. renniepak)
Shown in this YesWeHack [post](https://www.yeswehack.com/learn-bug-bounty/discover-map-hidden-endpoints-parameters):

```js
javascript:(function(){var scripts=document.getElementsByTagName("script"),regex=/(?<=(\"|\'|\`))\/[a-zA-Z0–9_?&=\/\-\#\.]*(?=(\"|\'|\`))/g;const results=new Set;for(var i=0;i<scripts.length;i++){var t=scripts[i].src;""!=t&&fetch(t).then(function(t){return t.text()}).then(function(t){var e=t.matchAll(regex);for(let r of e)results.add(r[0])}).catch(function(t){console.log("An error occurred: ",t)})}var pageContent=document.documentElement.outerHTML,matches=pageContent.matchAll(regex);for(const match of matches)results.add(match[0]);function writeResults(){results.forEach(function(t){document.write(t+"<br>")})}setTimeout(writeResults,3e3);})();
```

```
/static/manifest.json  
/channels/town-square  
/static/  
//  
/  
/login  
/image  
/./  
/patch  
/promote  
/demote  
/roles  
/mfa  
/password  
/password/reset  
/known  
/password/reset/send  
/active  
/email/verify  
/terms_of_service  
/email/verify/send  
/logout  
/ids  
/usernames  
/group_channels  
/username/  
/email/  
/image/default  
/autocomplete  
/sessions  
/sessions/revoke  
/sessions/revoke/all  
/audits  
/mfa/generate  
/sessions/device  
/search  
/status/ids  
/status  
/login/switch  
/oauth/apps/authorized  
/oauth/authorize  
/oauth/deauthorize  
/tokens  
/tokens/  
/tokens/revoke  
/tokens/disable  
/tokens/enable  
/regenerate_invite_id  
/exists  
/teams  
/teams/members  
/teams/unread  
/members/invite  
/batch  
/batch?graceful=true  
/stats  
/stats/filtered  
/invites/email  
/invite/  
/invite/email  
/invite-guests/email  
/invite/email?graceful=true  
/invite-guests/email?graceful=true  
/import  
/members/  
/schemeRoles  
/direct  
/group  
/restore  
/convert  
/privacy  
/notify_props  
/channels/name/  
/channels  
/channels/deleted  
/teams/  
/channels/members  
/timezones  
/moderations  
/moderations/patch  
/member_counts_by_group?include_timezones=  
/members/me/view  
/channels/autocomplete  
/channels/search_autocomplete  
/channels/search  
/channels/search_archived  
/search?include_deleted=  
/group/search  
/order  
/thread  
/posts  
/channels/  
/posts/unread  
/files/info  
/posts/flagged  
/pinned  
/posts/  
/set_unread  
/pin  
/unpin  
/reactions/  
/reactions  
/posts/search  
/opengraph  
/actions/  
/link  
/delete  
/system/ping?time=  
/upgrade_to_enterprise  
/upgrade_to_enterprise/status  
/restart  
/logs  
/config/client?format=old  
/license/client?format=old  
/warn_metrics/status  
/warn_metrics/ack/  
/websocket  
/regen_token  
/commands/autocomplete_suggestions  
/commands/autocomplete  
/execute  
/info  
/regen_secret  
/actions/dialogs/submit  
/name/  
/static/emoji/  
/policy  
/type/  
/cancel  
/config  
/config/reload  
/config/environment  
/email/test  
/site_url/test  
/caches/invalidate  
/database/recycle  
/compliance/reports  
/compliance/reports/  
/cluster/status  
/ldap/test  
/ldap/sync  
/ldap/groups  
/ldap/groups/  
/saml/certificate/status  
/saml/certificate/public  
/saml/certificate/private  
/saml/certificate/idp  
/elasticsearch/test  
/elasticsearch/purge_indexes  
/bleve/purge_indexes  
/license  
/analytics/old  
/names  
/install_from_url  
/statuses  
/webapp  
/enable  
/disable  
/groups  
/groups_by_channels  
/assign/  
/members_minus_group_members?  
/saml/metadatafromidp  
/users  
/scheme  
/members  
/users/  
/channels/categories  
/commands  
/files  
/preferences  
/hooks/incoming  
/hooks/incoming/  
/hooks/outgoing  
/hooks/outgoing/  
/oauth  
/oauth/apps  
/emoji  
/brand  
/image?t=  
/data_retention  
/jobs  
/plugins  
/marketplace  
/system/timezones  
/schemes  
/redirect_location  
/bots  
/thumbnail  
/preview  
/ad-blocked  
//dev.visualwebsiteoptimizer.com/j.php?a=  
//i.kissmetrics.com/i.js  
//scripts.kissmetrics.com/  
//static.chartbeat.com/js/  
//connect.facebook.net/en_US/fbevents.js  
/favicon.ico  
/sourceConfig/  
/a/b  
/connected  
/give_feedback  
/plugins/  
/a/i  
/BxyxW  
/ROIGq  
/WMCDd  
/n/Skb  
/login/desktop_token  
/users/count  
/users/export  
/status/custom  
/status/custom/recent/delete  
/move  
/me/channels  
/channel_members  
/stats/member_count  
/members/me/mark_read  
/read  
/read/  
/set_unread/  
/following  
/reminder  
/edit_history  
/files/search  
/ack  
/system/ping  
/marketplace/first_admin_visit  
/onboarding/complete  
/validate  
/policies  
/policies/  
/teams/search  
/logs/query  
/config/patch  
/ldap/certificate/public  
/ldap/certificate/private  
/trial-license  
/trial-license/prev  
/ldap/users/  
/group_sync_memberships  
/products  
/products/selfhosted  
/subscribe-newsletter  
/check-cws-connection  
/customer  
/customer/address  
/notify-admin  
/validate-business-email  
/validate-workspace-business-email  
/subscription  
/installation  
/subscription/invoices  
/subscription/invoices/  
/pdf  
/limits  
/storage  
/view  
/ancillary?subsection_permissions=  
/schema/version  
/drafts  
/ip_filtering  
/ip_filtering/my_ip  
/common_teams  
/convert_to_channel?team_id=  
/plugins/com.mattermost.apps  
/oauth/outgoing_connections  
/oauth/outgoing_connections/  
/system/notices  
/cloud  
/hosted_customer  
/usage  
/permissions  
/threads  
/system  
/reports  
/server  
/client_perf  
/static/plugins/  
/cloud-notify-admins  
/telemetry/track  
/calls/  
/recording/start  
/recording/stop  
/dismiss-notification  
/host/remove  
/host/mute-others  
/admin_console/plugins/plugin_com.mattermost.calls  
/admin_console/authentication/guest_access  
/admin_console/compliance/export  
/admin_console/environment/push_notification_server  
/host/end  
/boards  
/playbooks  
/expanded/  
/call  
/host/mute  
/host/screen-off  
/host/lower-hand  
/host/make  
/pl/  
/expanded  
/turn-credentials  
/qDObA  
/jUtaM  
/YZ/sw  
/RnCQb  
/MaJux  
/GCoTA  
/HtNUp  
/ZsEUy  
/fU9y/  
/except  
/top/reactions  
/me/top/reactions  
/top/channels  
/me/top/channels  
/top/threads  
/me/top/threads  
/top/inactive_channels  
/me/top/dms  
/me/top/inactive_channels  
/top/team_members  
/templates  
/duplicate?asTemplate=false&toTeam=  
/bootstrap  
/payment  
/payment/confirm  
/request-trial  
/license/renewal  
/api/v0  
/runs  
/runs/  
/status-updates  
/metadata  
/runs/channel/  
/playbooks/  
/duplicate  
/owner  
/checklists/  
/item/  
/state  
/timeline/  
/telemetry/run/  
/telemetry/playbook/  
/telemetry/template  
/telemetry  
/settings  
/retrospective  
/bot/notify-admins  
/bot/connect  
/followers  
/autofollows/  
/actions/channels/  
/request-join-channel  
/export  
/error?type=  
/outline  
/finish  
/playbooks/runs/  
/status-update-enabled  
/my_categories/  
/collapse  
/playbooks/import?team_id=  
/playbooks/runs  
/playbooks/playbooks  
/playbooks/playbooks/  
/autofollows  
/update-status-dialog  
/no-retrospective-button  
/skip  
/run  
/assignee  
/duedate  
/command  
/add  
/rename  
/checklists  
/checklists/move-item  
/checklists/move  
/request-update  
/retrospective/publish  
/runs/owners  
/outline#retrospective  
/stats/playbook?playbook_id=  
/my_categories/favorites?team_id=  
/start  
/incidents  
/error  
/graphql  
/stats/site  
/playbooks/insights/user/me  
/playbooks/insights/teams/  
/query  
/check-and-send-message-on-join
```
#### by hand to ensure nothing was missed


---

## understanding the repo

### using deepwiki for a quick overview
> [!warning] Some documentation generated by DeepWiki may be inaccurate. Always verify any LLM-created content.

*Make sure to use the deep research follow-up questions via DeepWiki if you're confused on anything in the repo.*
## questions to answer
How are the following items handled? Add features to the list as you discover them:
- Authentication
- Authorization
- Forgot password / change password functions
- 3rd-party plugins
- Web hooks
- Emails
- Logging
- etc.

